const Joi = require('joi');

module.exports = {
    createPlanValidator: {
        body: Joi.object({
            name: Joi.string().required(),
            market: Joi.string().required(),
            amount: Joi.number().min(0.01),
            schedule: Joi.string().valid(...['DAILY', 'WEEKLY', 'MONTHLY'])
        }),
    },

    editPlanValidator: {
        body: Joi.object({
            name: Joi.string().required(),
            amount: Joi.number().min(0.01),
            schedule: Joi.string().valid(...['DAILY', 'WEEKLY', 'MONTHLY'])
        }),
    },

    togglePlanValidator: {
        body: Joi.object({
            isActive: Joi.boolean().required(),
        }),
    },
};