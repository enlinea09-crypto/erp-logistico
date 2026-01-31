require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express(); // 👈 ESTO DEBE IR ANTES DE app.use

// ======================
// Middlewares globales
// ======================

app.use(helmet());

app.use(cors({
  origin: [
    "https://erp.slnebar.com",
    "http://localhost:5173"
  ],
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.use(express.json());

// ======================
// Routes
// ======================

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/vehicles", require("./routes/vehicle.routes"));
app.use("/api/drivers", require("./routes/driver.routes"));
app.use("/api/kpi", require("./routes/kpi.routes"));
app.use("/api/test", require("./routes/test.routes"));

// ======================
// Server start
// ======================

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Servidor ERP backend activo en puerto", PORT);
});
