const express = require("express")
const router = express.Router()

const verifyToken = require("../middlewares/auth.middleware")
const trackingController = require("../controllers/tracking.controller")

router.post("/", verifyToken, trackingController.createTracking)
router.get("/:orderId", verifyToken, trackingController.getTrackingByOrder)

module.exports = router
