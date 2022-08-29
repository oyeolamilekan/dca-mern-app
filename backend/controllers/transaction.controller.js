const { updateTransaction } = require("../jobs/events.jobs");
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

        const { id } = req.params;

        const { data, pagination } = await transactionModel.find({ plan: id, status: { $in: ['confirm', 'done', 'error'] } }).populate("plan").sort('-createdAt').paginate({ page: page })

        return res.status(200).json({ pagination, transactions: data })

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

        const limit = Number(req.query.limit) || 30;

        const skip = (page - 1) * limit;

        const transactions = await transactionModel.aggregate([
            {
                $lookup: {
                    from: "plans",
                    localField: "user",
                    foreignField: "id",
                    as: "plan",
                },
            },
            { $unwind: "$plan" },
            {
                $match: {
                    "plan.user": req.user._id
                }
            },
            { $group: { "_id": "$_id", doc: { "$first": "$$ROOT" } } },
            { $replaceRoot: { newRoot: "$doc" } },
            { $sort: { createdAt: -1 } },

        ]).skip(skip).limit(limit)

        return res.status(200).json({ hits: transactions.length, transactions })

    } catch (error) {
        return res.status(500).json({ msg: "Server error" })
    }
}

module.exports = {
    updateTransactionWebhook,
    fetchTransaction,
    fetchAllTransaction,
}