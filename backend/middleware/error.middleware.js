const { ValidationError } = require('express-validation')

const errorHandler = (err, _, res, __) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }

    if (err) {

        const statusCode = res.statusCode ? res.statusCode : 500

        return res.status(statusCode).json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        })
    }

    return res.status(500).json(err)
}

module.exports = {
    errorHandler,
}