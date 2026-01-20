const express = require("express")
const router = express.Router()

const verifyToken = require("../middlewares/auth.middleware")

router.get("/protected", verifyToken, (req, res) => {

 res.json({
  message: "Acceso autorizado",
  userId: req.userId
 })

})

module.exports = router
