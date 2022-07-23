const mongoose = require("mongoose")

/**
 * User schema
 * 
 * encryptedApiKey: user apikey encrypted for security
 * name:            user full name
 * email:           user email address
 */
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

userSchema.statics.findOneOrCreate = async function(condition, doc) {
    const one = await this.findOne(condition);
    return one || this.create(doc);
}

module.exports = mongoose.model("User", userSchema);