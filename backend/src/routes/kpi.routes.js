const express = require("express")
const router = express.Router()

const verifyToken = require("../middlewares/auth.middleware")
const kpiController = require("../controllers/kpi.controller")

router.get("/dashboard", verifyToken, kpiController.getDashboard)

module.exports = router
