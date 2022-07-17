const express = require("express");

const { markets } = require("../controllers/markets.controller");

const { protect } = require("../middleware/auth.middleware");

const router = express.Router()

router.route('/all_markets').get(protect, markets)

module.exports = router
