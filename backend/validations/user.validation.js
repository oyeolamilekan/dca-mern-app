const Joi = require('joi');

module.exports = {
    syncUserAccountValidator: {
        body: Joi.object({
            secretKey: Joi.string().required(),
        }),
    },

    authenticateAccountValidator: {
        body: Joi.object({
            code: Joi.string().required(),
        }),
    },
};