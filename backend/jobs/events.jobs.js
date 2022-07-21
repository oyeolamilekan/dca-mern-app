const Bull = require("bull")

/**
 * Add the mail event data to the mail-queue Queue.
 * this transaction will be executed in the background.
 * @param {*} data 
 */
const sendMailEvent = async (data) => {
    const emailProcessingQueue = new Bull("mail-queue")
    await emailProcessingQueue.add(data)
}

/**
 * Add the transaction data to the instant-order-final-process Queue.
 * this transaction will be executed in the background.
 * @param {*} data 
 */
const updateTransaction = async (data) => {
    const transactionProcessingQueue = new Bull("instant-order-final-process")
    await transactionProcessingQueue.add(data)
}

module.exports = { sendMailEvent, updateTransaction }