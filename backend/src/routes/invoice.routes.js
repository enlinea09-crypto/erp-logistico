const express = require("express")
const router = express.Router()

const verifyToken = require("../middlewares/auth.middleware")
const invoiceController = require("../controllers/invoice.controller")

router.post("/", verifyToken, invoiceController.createInvoice)
router.get("/", verifyToken, invoiceController.getInvoices)

module.exports = router
