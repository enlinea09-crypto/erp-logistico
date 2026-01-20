const express = require("express")
const router = express.Router()

const verifyToken = require("../middlewares/auth.middleware")
const driverController = require("../controllers/driver.controller")

router.post("/", verifyToken, driverController.createDriver)
router.get("/", verifyToken, driverController.getDrivers)

module.exports = router
