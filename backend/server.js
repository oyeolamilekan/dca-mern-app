const express = require("express");

require("dotenv").config()

const { errorHandler } = require("./middleware/error.middleware");

const { requestMiddleware } = require("./middleware/request.middleware");

const logger = require("./services/logging.service");

const cors = require("cors");

const AppSetup = require("./services/setup.service");

AppSetup.setupServices()

const port = process.env.PORT || 4000

const app = express()

app.use(cors());

app.use(requestMiddleware)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use("/api/user", require("./routes/user.routes"))

app.use("/api/markets", require("./routes/markets.routes"))

app.use("/api/plan", require("./routes/plan.routes"))

app.use("/api/transaction", require("./routes/transaction.routes"))

app.use(errorHandler)

app.use('*', function (_, res) {
    res.status(404).json({ data: 'route not found' });
});

app.listen(port, () => logger.info(`Server started on port ${port}`))