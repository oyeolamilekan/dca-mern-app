const Bull = require("bull")
const transactionModel = require("../models/transaction.model")

/**
 * Process the data that has been added to the 'mail-queue'
 */
const sendEmailQueueListener = async () => {
    const emailProcessingQueue = new Bull("mail-queue")
    emailProcessingQueue.process(async (jobs) => {
        await sendMail(jobs.data)
    })
}

const sendMail = async (data) => {
    console.log(`Done: ${data.message}`)
}

/**
 * Process the instant order that has been added to the instant-order-final-process queue.
 */
const updateInstantOrderFromWebhook = async () => {
    const transactionProcessingQueue = new Bull("instant-order-final-process")
    transactionProcessingQueue.process(async (jobs) => {
        await processTransaction(jobs.data)
    })
}

const processTransaction = async (payload) => {
    await transactionModel.findOneAndUpdate({ transaction_id: payload.data.id }, { status: payload.data.status })
}

module.exports = { sendEmailQueueListener, updateInstantOrderFromWebhook }