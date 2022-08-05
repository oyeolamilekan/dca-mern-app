const logger = require("../services/logging.service");

const requestMiddleware = (req, res, next) => {

    logger.info(`REQUEST - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logger.info(`RESPONSE - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
}

module.exports = {
    requestMiddleware,
}