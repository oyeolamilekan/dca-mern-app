const express = require("express");

const { validate } = require("express-validation");

const { createPlan, editPlan, togglePlan, fetchPlans } = require("../controllers/plans.controller");

const { protect } = require("../middleware/auth.middleware");

const { createPlanValidator, editPlanValidator, togglePlanValidator } = require("../validations/plans.validation");

const router = express.Router()

router.route('/create_plan').post(protect, validate(createPlanValidator), createPlan)

router.route('/edit_plan/:id').put(protect, validate(editPlanValidator), editPlan)

router.route('/toggle_plan/:id').patch(protect, validate(togglePlanValidator), togglePlan)

router.route('/fetch_plans').get(protect, fetchPlans)

module.exports = router