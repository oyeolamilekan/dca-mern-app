const express = require("express")

const router = express.Router()

const { syncUserAccount, authenticateAccount } = require("../controllers/user.controller");

router.route('/syncAccount').post(syncUserAccount)

router.route('/authenticate').post(authenticateAccount)

module.exports = router
