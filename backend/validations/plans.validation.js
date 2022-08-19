const Joi = require('joi');

module.exports = {
    createPlanValidator: {
        body: Joi.object({
            name: Joi.string().required(),
            market: Joi.string().required(),
            amount: Joi.number().min(1),
            schedule: Joi.string().valid(...['DAILY', 'WEEKLY', 'MONTHLY'])
        }),
    },

    editPlanValidator: {
        body: Joi.object({
            name: Joi.string().required(),
            amount: Joi.number().min(1),
            schedule: Joi.string().valid(...['DAILY', 'WEEKLY', 'MONTHLY'])
        }),
    },

    togglePlanValidator: {
        body: Joi.object({
            id: Joi.string().required(),
            isActive: Joi.boolean().required(),
        }),
    },
};