const express = require("express");

const { updateTransactionWebhook, fetchTransaction, fetchAllTransaction } = require("../controllers/transaction.controller");

const { protectWebook } = require("../middleware/webhook.middleware");

const { protect } = require("../middleware/auth.middleware");

const router = express.Router()

router.route('/process_instant_order').post(protectWebook, updateTransactionWebhook)

router.route('/transactions/:id').get(protect, fetchTransaction)

router.route('/').get(protect, fetchAllTransaction)

module.exports = router
