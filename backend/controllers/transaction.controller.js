const { updateTransaction } = require("../jobs/events.jobs");
const plansModel = require("../models/plans.model");
const transactionModel = require("../models/transaction.model");

/**
 * Updates the instant record on the background.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateTransactionWebhook = async (req, res) => {
    try {
        const data = req.body;
        switch (data.event) {
            case 'instant_order.done':
            case 'instant_order.cancelled':
                updateTransaction(data)
                break;
            default:
                break;
        }
        return res.status(200).json({})
    } catch (error) {
        return res.status(500).json({ msg: "Server error" })
    }
}

/**
 * Fetchs transactions related to the plan.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const fetchTransaction = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const { id } = req.params;

        const transactions = await transactionModel.find({ plan: id }).skip(skip).limit(limit).sort('-createdAt')

        return res.status(200).json({ hits: transactions.length, transactions })

    } catch (error) {
        return res.status(500).json({ msg: "Server error" })
    }
}

/**
 * Fetchs all transaction created on the users account..
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const fetchAllTransaction = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const transactions = await transactionModel.find({}).populate({
            path: 'plan', match: { user: { $eq: req.user._id }, },
        }).skip(skip).limit(limit).sort('-createdAt')

        return res.status(200).json({ hits: transactions.length, transactions })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
}

module.exports = {
    updateTransactionWebhook,
    fetchTransaction,
    fetchAllTransaction,
}