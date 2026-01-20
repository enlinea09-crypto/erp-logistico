const express = require("express")
const router = express.Router()

const verifyToken = require("../middlewares/auth.middleware")
const orderController = require("../controllers/order.controller")

router.post("/", verifyToken, orderController.createOrder)
router.get("/", verifyToken, orderController.getOrders)

module.exports = router
