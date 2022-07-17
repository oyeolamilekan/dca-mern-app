const express = require("express");

const { createPlan, editPlan, togglePlan, fetchPlans } = require("../controllers/plans.controller");

const { protect } = require("../middleware/auth.middleware");

const router = express.Router()

router.route('/create_plan').post(protect, createPlan)

router.route('/edit_plan/:id').put(protect, editPlan)

router.route('/toggle_plan/:id').patch(protect, togglePlan)

router.route('/fetch_plans').get(protect, fetchPlans)

module.exports = router