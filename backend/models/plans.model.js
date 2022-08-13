const mongoose = require("mongoose");
const PaginatePlugin = require("../plugins/pagination.plugin");

/**
 * Plans schema containing information about the trading strategy
 * 
 * user:        tied to the user.
 * market:      the asset pair.
 * name:        name of the plan
 * amount:      amount scheduled to purchase
 * isActive:    if the plan is active.
 * schedule:    how often is the system going to buy an asset.
 */
const plansSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    market: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Market',
    },
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    amount: {
        type:  Number,
        default: 0.00,
        required: [true, "Please add an amount"]
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    schedule: {
        type: String,
        enum: ['DAILY', 'WEEKLY', 'MONTHLY'],
        default: "DAILY",
        required: [true, "Please add a schedule"],
    },
}, { timestamps: true })

plansSchema.plugin(PaginatePlugin, { limit: 20 })

module.exports = mongoose.model("Plans", plansSchema);