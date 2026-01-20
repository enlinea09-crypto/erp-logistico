const pool = require("../config/db")

exports.getDashboard = async (req, res) => {

 try {

  // Ingresos y utilidades
  const finance = await pool.query(`
   SELECT 
    COALESCE(SUM(transport_price),0) AS total_income,
    COALESCE(SUM(total_cost),0) AS total_cost,
    COALESCE(SUM(profit),0) AS total_profit
   FROM invoices
  `)

  // Órdenes por estado
  const orders = await pool.query(`
   SELECT status, COUNT(*) 
   FROM transport_orders
   GROUP BY status
  `)

  // Top clientes
  const clients = await pool.query(`
   SELECT c.name, SUM(i.transport_price) AS total
   FROM invoices i
   JOIN transport_orders o ON i.order_id = o.id
   JOIN clients c ON o.client_id = c.id
   GROUP BY c.name
   ORDER BY total DESC
   LIMIT 5
  `)

  // Flota activa
  const vehicles = await pool.query(`
   SELECT COUNT(*) 
   FROM vehicles 
   WHERE status = 'activo'
  `)

  res.json({
   finance: finance.rows[0],
   orders: orders.rows,
   top_clients: clients.rows,
   active_vehicles: vehicles.rows[0].count
  })

 } catch (error) {

  console.error(error)
  res.status(500).json({ message: "Error KPI" })

 }

}
