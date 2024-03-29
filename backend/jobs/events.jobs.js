const Bull = require("bull")
const { REDIS_URL } = require("../constants/db.const")

/**
 * Add the mail event data to the mail-queue Queue.
 * this action will be executed in the background.
 * @param {*} data 
 */
const sendMailEvent = async (data) => {
    const emailProcessingQueue = new Bull("mail-queue", REDIS_URL)
    await emailProcessingQueue.add(data)
}

/**
 * Add the transaction data to the instant-order-final-process Queue.
 * this transaction will be executed in the background.
 * @param {*} data 
 */
const updateTransaction = async (data) => {
    const transactionProcessingQueue = new Bull("instant-order-final-process", REDIS_URL)
    await transactionProcessingQueue.add(data)
}

module.exports = { sendMailEvent, updateTransaction }