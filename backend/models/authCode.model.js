const mongoose = require("mongoose")

/**
 * Auth codes used to authenticate users.
 * user:    for user id more like foreign key
 * code:    authentication code.
 * isUsed:  check if the token is used.
 */
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