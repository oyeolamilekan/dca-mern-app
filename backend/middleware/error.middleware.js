const errorHandler = (err, _, res, __) => {
    if (err) {

        const statusCode = res.statusCode ? res.statusCode : 500

        return res.status(statusCode).json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        })
    }
}

module.exports = {
    errorHandler,
}