const startJobs = require("../jobs/cron.jobs");

const { sendEmailQueueListener, updateInstantOrderFromWebhook } = require("../jobs/listeners.jobs");


class AppSetup {

    static setupServices() {

        startJobs()

        sendEmailQueueListener()

        updateInstantOrderFromWebhook()
    }
}

module.exports = AppSetup;
