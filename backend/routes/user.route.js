const express = require("express")

const router = express.Router()

const { syncUserAccount, signinAccount, authenticateAccount } = require("../controllers/user.controller");

router.route('/syncAccount').post(syncUserAccount)

router.route('/signin').post(signinAccount)

router.route('/authenticate').post(authenticateAccount)

module.exports = router
