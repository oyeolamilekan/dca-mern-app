const Bull = require("bull")

const sendMailEvent = async (data) => {
    const emailProcessingQueue = new Bull("mail-queue")
    await emailProcessingQueue.add(data)
}

const updateTransaction = async (data) => {
    const transactionProcessingQueue = new Bull("instant-order-final-process")
    await transactionProcessingQueue.add(data)
}

module.exports = { sendMailEvent, updateTransaction }