const pool = require("../config/db");

exports.getDashboardKPI = async (req, res) => {
  try {

    const orders = await pool.query("SELECT COUNT(*) FROM orders");
    const vehicles = await pool.query("SELECT COUNT(*) FROM vehicles");
    const drivers = await pool.query("SELECT COUNT(*) FROM drivers");

    res.json({
      orders: Number(orders.rows[0].count),
      vehicles: Number(vehicles.rows[0].count),
      drivers: Number(drivers.rows[0].count)
    });

  } catch (error) {
    console.error("KPI ERROR:", error);
    res.status(500).json({ message: "Error obteniendo KPI" });
  }
};
