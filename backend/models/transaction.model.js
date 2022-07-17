const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Plans',
    },
    transaction_id: {
        type: String,
    },
    status: {
        type: String,
        default: "confirm",
        enum: ['confirm', 'done', 'fail', 'error'],
    },
    message: {
        type: String
    },
    total: {
        type: Map,
    },
    fee: {
        type: Map,
    },
    receive: {
        type: Map,
    }
    
}, { timestamps: true })

module.exports = mongoose.model("Transaction", transactionSchema);