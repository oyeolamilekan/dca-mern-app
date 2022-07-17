const mongoose = require("mongoose")

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

module.exports = mongoose.model("Plans", plansSchema);