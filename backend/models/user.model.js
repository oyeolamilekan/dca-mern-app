const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    encryptedApiKey: {
        type: String,
        required: [true, "Please add a name"]
    },
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
    },
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema);