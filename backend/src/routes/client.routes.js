const express = require("express")
const router = express.Router()

const verifyToken = require("../middlewares/auth.middleware")
const clientController = require("../controllers/client.controller")

// Protegidas con JWT
router.post("/", verifyToken, clientController.createClient)
router.get("/", verifyToken, clientController.getClients)

module.exports = router
