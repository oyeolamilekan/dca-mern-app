const marketsModel = require("../models/markets.model");
const Plans = require("../models/plans.model");
const logger = require("../services/logging.service");

const createPlan = async (req, res) => {
    try {
        const { name, market, amount, schedule } = req.body;
        const marketObj = await marketsModel.findOne({ name: market })
        const plan = await Plans.create({
            user: req.user._id,
            market: marketObj._id,
            name, amount, schedule,
        })
        const planObj = {
            name: plan.name,
            schedule: plan.schedule,
            amount: plan.amount,
            market: marketObj.name,
            id: plan._id
        }
        return res.status(201).json({ msg: "Plan successfully created.", data: planObj })
    } catch (error) {
        return res.status(500).json({ msg: "Error in creating plan" })
    }
}

const editPlan = async (req, res) => {
    try {
        const { id } = req.params;

        const plan = await Plans.findById(id);

        if (!plan) {
            res.status(400).json({
                message: "Bad request"
            })
        }

        if (plan.user != req.user.id) {
            res.status(401).json({ message: "Not Authorized request." })
        }

        const updatedPlan = await (await Plans.findByIdAndUpdate(id, req.body, { new: true })).populate("market");

        res.status(200).send(updatedPlan)

    } catch (error) {
        return res.status(500).json({ message: "Could not edit plan." })
    }

}

const togglePlan = async (req, res) => {
    try {
        const { id } = req.params;

        const { isActive } = req.body;

        const plan = await Plans.findByIdAndUpdate(id, { isActive }, { new: true });

        if (!plan) {
            return res.status(400).json({
                message: "Bad request"
            })
        }

        if (plan.user != req.user.id) {
            return res.status(401).json({ message: "Not Authorized request." })
        }

        const planAcction = `${isActive ? "activated" : 'deactivated'}`;

        return res.status(200).json({ message: `Plan has been ${planAcction}.` })

    } catch (error) {
        return res.status(500).json({ message: "Could not update plan." })
    }

}

const fetchPlans = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const goals = await Plans.find({ user: req.user.id, isActive: true }).skip(skip).limit(limit).select("-user").sort('-createdAt').populate("market")

        return res.status(200).send({ hits: goals.length, goals })

    } catch (error) {

        return res.status(500).json({ message: "Error in fetching plans." })
    }
}

module.exports = {
    createPlan,
    editPlan,
    togglePlan,
    fetchPlans
}