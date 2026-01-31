const express = require("express");
const router = express.Router();

const { getDashboardKPI } = require("../controllers/kpi.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/dashboard", authMiddleware, getDashboardKPI);

module.exports = router;
