const { updateTransaction } = require("../jobs/events.jobs");
const transactionModel = require("../models/transaction.model");

const updateTransactionWebhook = async (req, res) => {
    try {
        const data = req.body;
        switch (data.event) {
            case 'instant_order.confirmed':
            case 'instant_order.cancelled':
            case 'instant_order.done':
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

module.exports = {
    updateTransactionWebhook,
    fetchTransaction,
}