const mongoose = require("mongoose")

const authCodeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    isUsed: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("AuthCode", authCodeSchema);