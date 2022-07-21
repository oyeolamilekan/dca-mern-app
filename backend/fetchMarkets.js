const Quidax = require("quidax-node")
const marketsModel = require("./models/markets.model")
const logger = require("./services/logging.service")

/**
 * Loads all of the available market once the application has been initialised.
 */
const loadMarkets = async () => {
    try {

        const quidax = new Quidax(process.env.QUIDAX_SECRET_API)

        const markets = await quidax.markets.listAllMarkets()

        markets.data.forEach(async (data) => {
            await marketsModel.findOneOrCreate({ name: data.id }, { name: data.id, base_unit: data.base_unit, quote_unit: data.quote_unit, },)
        })

        logger.info("Successfully loaded all the markets")

    } catch (error) {
        logger.error("Could not load in the markets")
    }
}

loadMarkets()
