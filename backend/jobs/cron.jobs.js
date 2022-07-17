const cron = require('node-cron');
const constants = require("../constants/cronsValues");
const logger = require('../services/logging.service');
const { processDCA } = require('../services/trading.service');

startJobs = () => {

    cron.schedule(constants.DAILY, async () => {
        try {
            processDCA("DAILY")
        } catch (error) {
            logger.error(`Daily Cron failed in executing: ${error.message}`);
        }
        logger.info("Daily crons started");
    });

    cron.schedule(constants.WEEKLY, async () => {
        try {
            processDCA("WEEKLY")
        } catch (error) {
            logger.error(`Weekly Cron failed in executing: ${error.message}`);
        }
        logger.info("Weekly crons started");
    });

    cron.schedule(constants.MONTHLY, async () => {
        try {
            processDCA("MONTHLY")
        } catch (error) {
            logger.error(`Monthly Cron failed in executing: ${error.message}`);
        }
        logger.info("Monthly crons started");
    });

}

module.exports = startJobs