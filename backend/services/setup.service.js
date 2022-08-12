const connectDB = require("../config/db.config");
const startJobs = require("../jobs/cron.jobs");

const { sendEmailQueueListener, updateInstantOrderQueueListener } = require("../jobs/listeners.jobs");


class AppSetup {

    static setupServices() {

        connectDB()

        startJobs()

        sendEmailQueueListener()

        updateInstantOrderQueueListener()
    }
}

module.exports = AppSetup;
