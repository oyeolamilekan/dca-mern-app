const Bull = require("bull")
const { REDIS_URL } = require("../constants/db.const")
const transactionModel = require("../models/transaction.model")
const logger = require("../services/logging.service")

/**
 * Process the data that has been added to the 'mail-queue'
 */
const sendEmailQueueListener = async () => {
    const emailProcessingQueue = new Bull("mail-queue", REDIS_URL)
    emailProcessingQueue.process(async (jobs) => {
        await sendMail(jobs.data)
    })
    
    emailProcessingQueue.on("global:completed", (job, result) => {
        emailProcessingQueue.clean(0, "completed");
        logger.info(`Job completed ${job} Result ${result}`)
    })
}

const sendMail = async (data) => {
    console.log(`Done: ${data.message}`)
}

/**
 * Process the instant order that has been added to the instant-order-final-process queue.
 */
const updateInstantOrderFromWebhook = async () => {
    const transactionProcessingQueue = new Bull("instant-order-final-process", REDIS_URL)
    transactionProcessingQueue.process(async (jobs) => {
        await processTransaction(jobs.data)
    })

    transactionProcessingQueue.on("global:completed", (job, result) => {
        transactionProcessingQueue.clean(0, "completed");
        logger.info(`Job completed ${job} Result ${result}`)
    })
}

const processTransaction = async (payload) => {
    await transactionModel.findOneAndUpdate({ transaction_id: payload.data.id }, { status: payload.data.status })
}

module.exports = { sendEmailQueueListener, updateInstantOrderFromWebhook }