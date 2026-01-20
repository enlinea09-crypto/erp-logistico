const express = require("express")
const router = express.Router()

const verifyToken = require("../middlewares/auth.middleware")
const vehicleController = require("../controllers/vehicle.controller")

router.post("/", verifyToken, vehicleController.createVehicle)
router.get("/", verifyToken, vehicleController.getVehicles)

module.exports = router
