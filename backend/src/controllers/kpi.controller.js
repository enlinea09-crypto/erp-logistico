const pool = require("../config/db");

exports.getDashboardKPI = async (req, res) => {
  try {

    // KPI simples dashboard
    const ordersCount = await pool.query("SELECT COUNT(*) FROM orders");
    const vehiclesCount = await pool.query("SELECT COUNT(*) FROM vehicles");
    const driversCount = await pool.query("SELECT COUNT(*) FROM drivers");

    // Finanzas (placeholder ERP)
    const finance = {
      total_income: 0,
      total_cost: 0,
      total_profit: 0
    };

    // Vehículos activos
    const activeVehicles = await pool.query(
      "SELECT COUNT(*) FROM vehicles WHERE status = 'AVAILABLE'"
    );

    // Top clientes (placeholder)
    const topClients = [];

    res.json({
      orders: Number(ordersCount.rows[0].count),
      vehicles: Number(vehiclesCount.rows[0].count),
      drivers: Number(driversCount.rows[0].count),

      finance,
      active_vehicles: Number(activeVehicles.rows[0].count),
      top_clients: topClients
    });

  } catch (error) {
    console.error("KPI ERROR:", error);
    res.status(500).json({ message: "Error obteniendo KPI" });
  }
};
