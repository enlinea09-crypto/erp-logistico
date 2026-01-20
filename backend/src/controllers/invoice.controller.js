const pool = require("../config/db")

// Crear factura
exports.createInvoice = async (req, res) => {

 try {

  const {
   order_id,
   transport_price,
   fuel_cost,
   toll_cost,
   other_cost
  } = req.body

  if (!order_id || !transport_price) {
   return res.status(400).json({ message: "Datos obligatorios faltantes" })
  }

  const total_cost =
   Number(fuel_cost || 0) +
   Number(toll_cost || 0) +
   Number(other_cost || 0)

  const profit =
   Number(transport_price) - total_cost

  await pool.query(
   `INSERT INTO invoices
    (order_id, transport_price, fuel_cost, toll_cost, other_cost, total_cost, profit)
    VALUES($1,$2,$3,$4,$5,$6,$7)`,
   [
    order_id,
    transport_price,
    fuel_cost,
    toll_cost,
    other_cost,
    total_cost,
    profit
   ]
  )

  res.json({
   message: "Factura creada",
   total_cost,
   profit
  })

 } catch (error) {

  console.error(error)
  res.status(500).json({ message: "Error creando factura" })

 }

}

// Listar facturas
exports.getInvoices = async (req, res) => {

 try {

  const result = await pool.query(
   `SELECT i.id,
           o.id as order_id,
           c.name as client,
           i.transport_price,
           i.total_cost,
           i.profit,
           i.status,
           i.invoice_date
    FROM invoices i
    JOIN transport_orders o ON i.order_id = o.id
    JOIN clients c ON o.client_id = c.id
    ORDER BY i.id DESC`
  )

  res.json(result.rows)

 } catch (error) {

  console.error(error)
  res.status(500).json({ message: "Error obteniendo facturas" })

 }

}
