const mongoose = require("mongoose");
const PaginatePlugin = require("../plugins/pagination.plugin");
/**
 * Transactions schema records every trade executed by the plans
 * 
 * plan:            foreign key to the plans schema
 * transaction_id:  transaction id returned by quidax
 * status:          transaction status
 * message:         error message if the transaction fails to execute.
 * total:           total transaction object.
 * price:           price transaction object.
 * fea:             fee transaction object.
 * receive:         total amount user will recieve after successful transaction.
 */
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
    price: {
        type: Map,
    },
    fee: {
        type: Map,
    },
    receive: {
        type: Map,
    }
    
}, { timestamps: true })

transactionSchema.plugin(PaginatePlugin, { limit: 30 })

module.exports = mongoose.model("Transaction", transactionSchema);