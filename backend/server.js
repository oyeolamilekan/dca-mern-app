const express = require("express");

const dotenv = require("dotenv").config()

const connectDB = require("./config/db");

const startJobs = require("./jobs/cron.jobs");

const { sendEmailQueueListener, updateInstantOrderFromWebhook } = require("./jobs/listeners.jobs")

const logger = require("./services/logging.service");

const port = process.env.PORT || 8000

connectDB()

startJobs()

sendEmailQueueListener()

updateInstantOrderFromWebhook()

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use("/api/user", require("./routes/user.route"))

app.use("/api/markets", require("./routes/markets.route"))

app.use("/api/plan", require("./routes/plan.route"))

app.use("/api/transaction", require("./routes/transaction.route"))

app.listen(port, () => logger.info(`Server started on port ${port}`))