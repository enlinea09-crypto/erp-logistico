require("dotenv").config();

//const express = require("express");
//const app = express()

const helmet = require("helmet");
const cors = require("cors");

// MIDDLEWARES — DEBEN IR ANTES DE RUTAS
app.use(helmet());

app.use(cors({
  origin: [
    "https://erp.slnebar.com",
    "http://localhost:5173"
  ],
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.use(express.json());  // <<<<<< ESTO ES OBLIGATORIO



// RUTAS
const authRoutes = require("./routes/auth.routes")
const testRoutes = require("./routes/test.routes")
const clientRoutes = require("./routes/client.routes")
const vehicleRoutes = require("./routes/vehicle.routes")
const driverRoutes = require("./routes/driver.routes")
const orderRoutes = require("./routes/order.routes")
const trackingRoutes = require("./routes/tracking.routes")
const invoiceRoutes = require("./routes/invoice.routes")
const kpiRoutes = require("./routes/kpi.routes")

app.use("/api/auth", authRoutes)
app.use("/api/test", testRoutes)
app.use("/api/clients", clientRoutes)
app.use("/api/vehicles", vehicleRoutes)
app.use("/api/drivers", driverRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/tracking", trackingRoutes)
app.use("/api/invoices", invoiceRoutes)
app.use("/api/kpi", kpiRoutes)


// SERVER
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
 console.log("Servidor ERP activo en puerto " + PORT)
})
