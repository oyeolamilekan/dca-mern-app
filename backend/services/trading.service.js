const Quidax = require("quidax-node");
const Plans = require('../models/plans.model');
const Transaction = require('../models/transaction.model');
const { decrypt } = require("../services/encryption.service");

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
        return { status: 'error', message: error }
    }


}

const processDCA = async (shedule) => {
    const plans = await Plans.find({ schedule: shedule, isActive: true }).populate("user").populate("market")
    plans.forEach(async (plan) => {
        const decryptedKey = decrypt(plan.user.encryptedApiKey)
        const amount = plan.amount;
        const response = await buyAsset(decryptedKey, plan.market.quote_unit, plan.market.base_unit, amount)
        if (response.status == "success") {
            await Transaction.create({
                plan: plan.id,
                transaction_id: response.data.id,
                status: response.data.status,
                total: response.data.total,
                fee: response.data.fee,
                receive: response.data.receive,
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