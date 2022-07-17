const marketsModel = require("../models/markets.model")

const markets = async (req, res) => {
    try {
        const markets = await marketsModel.find();
        return res.status(200).json(markets);
    } catch (error) {
        return res.status(500).json({ message: "Could not fetch markets." })
    }
}

module.exports = {
    markets,
}