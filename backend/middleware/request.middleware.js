const logger = require("../services/logging.service");

const requestMiddleware = (err,req, res, next) => {
    logger.info(JSON.stringify({ "path": req.path, "method": req.method }))
    next()
}

module.exports = {
    requestMiddleware,
}