const Bull = require("bull")
const transactionModel = require("../models/transaction.model")

const sendEmailQueueListener = async () => {
    const emailProcessingQueue = new Bull("mail-queue")
    emailProcessingQueue.process(async (jobs) => {
        await sendMail(jobs.data)
    })
}

const sendMail = async (data) => {
    console.log(`Done: ${data.message}`)
}

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