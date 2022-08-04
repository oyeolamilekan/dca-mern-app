const mongoose = require("mongoose")

/**
 * Markets data for dca info
 */
const marketSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    base_unit: {
        type: String,
        required: [true, "Please add a name"]
    },
    quote_unit: {
        type: String,
        required: [true, "Please add a name"]
    },
}, {timestamps: true})

marketSchema.statics.findOneOrCreate = async function(condition, doc) {
    return this.create(doc);
}

module.exports = mongoose.model("Market", marketSchema);