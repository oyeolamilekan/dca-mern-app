const express = require("express")

const { validate } = require("express-validation");

const router = express.Router()

const { syncUserAccount, authenticateAccount } = require("../controllers/user.controller");

const { syncUserAccountValidator, authenticateAccountValidator } = require("../validations/user.validation");

router.route('/syncAccount').post(validate(syncUserAccountValidator), syncUserAccount)

router.route('/authenticate').post(validate(authenticateAccountValidator), authenticateAccount)

module.exports = router
