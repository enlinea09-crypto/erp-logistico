const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API ERP funcionando OK" });
});

module.exports = router;
