const Quidax = require("quidax-node");
const Plans = require('../models/plans.model');
const Transaction = require('../models/transaction.model');
const { decrypt } = require("../services/encryption.service");

/**
 * buys an asset on behalf of the authenticated user.
 * @param {string} secretKey 
 * @param {string} bid 
 * @param {string} ask 
 * @param {string} total 
 * @returns {string}
 */
const buyAsset = async (secretKey, bid, ask, total) => {
    try {
        const quidax = new Quidax(secretKey)

        const instantOrderObj = await quidax.instantOrder.createInstantOrder("me", {
            "bid": bid,
            "ask": ask,
            "type": "buy",
            "total": total,
            "unit": bid,
        })

        if (instantOrderObj.status == 'error') {
            return instantOrderObj;
        }

        const confirmInsantOrderObj = await quidax.instantOrder.confirmInstantOrder("me", instantOrderObj.data.id)
        return confirmInsantOrderObj;
    } catch (error) {
        console.log(error)
        return { status: 'error', message: error }
    }


}

/**
 * Process the DCA plans on behalf of the user
 * @param {string} shedule 
 */
const processDCA = async (shedule) => {
    const plans = await Plans.find({ schedule: shedule, isActive: true }).populate("user").populate("market")
    plans.forEach(async (plan) => {
        const decryptedKey = decrypt(plan.user.encryptedApiKey)
        const amount = plan.amount;
        const response = await buyAsset(decryptedKey, plan.market.quote_unit, plan.market.base_unit, amount)
        if (response.status == "success") {
            const { status, total, fee, receive } = response.data
            await Transaction.create({
                plan: plan.id,
                transaction_id: response.data.id,
                status,
                total,
                fee,
                receive,
            })
        } else {
            await Transaction.create({
                plan: plan.id,
                status: response.status,
                message: response.message
            })
        }
    })
}


module.exports = { buyAsset, processDCA }