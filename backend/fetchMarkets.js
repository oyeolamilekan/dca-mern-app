const Quidax = require("quidax-node")
const marketsModel = require("./models/markets.model")
const logger = require("./services/logging.service")
const connectDB = require("./config/db.config");
const { QUIDAX_SECRET_API } = require("./constants/auth.const");

/**
 * Loads all of the available market once the application has been initialised.
 */
const loadMarkets = async () => {
    try {

        connectDB()

        const quidax = new Quidax(QUIDAX_SECRET_API)

        const markets = await quidax.markets.listAllMarkets()

        markets.data.forEach(async (data) => {
            await marketsModel.findOneOrCreate({ name: data.id }, { name: data.id, base_unit: data.base_unit, quote_unit: data.quote_unit, },)
        })

        logger.info("Successfully loaded all the markets")

        process.exit(1);

    } catch (error) {
        console.log(error)
        logger.error("Could not load in the markets")
    }
}

loadMarkets();
