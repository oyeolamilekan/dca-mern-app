const cron = require('node-cron');
const { DAILY, WEEKLY, MONTHLY, TESTING } = require("../constants/crons.const");
const logger = require('../services/logging.service');
const { processDCA } = require('../services/trading.service');

startJobs = () => {

    /// Execute the daily plans
    cron.schedule(DAILY, async () => {
        try {
            processDCA("TESTING")
        } catch (error) {
            logger.error(`Daily Cron failed in executing: ${error.message}`);
        }
        logger.info("Daily crons started");
    });

    /// Execute the weekly plans
    cron.schedule(WEEKLY, async () => {
        try {
            processDCA("WEEKLY")
        } catch (error) {
            logger.error(`Weekly Cron failed in executing: ${error.message}`);
        }
        logger.info("Weekly crons started");
    });

    /// Execute the monthly plans
    cron.schedule(MONTHLY, async () => {
        try {
            processDCA("MONTHLY")
        } catch (error) {
            logger.error(`Monthly Cron failed in executing: ${error.message}`);
        }
        logger.info("Monthly crons started");
    });

}

module.exports = startJobs