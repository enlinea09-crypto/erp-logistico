const pool = require("../config/db")

// Crear orden
exports.createOrder = async (req, res) => {

 try {

  const {
   client_id,
   vehicle_id,
   driver_id,
   origin,
   destination,
   cargo_description,
   cargo_weight_kg,
   planned_date
  } = req.body

  if (!client_id || !origin || !destination) {
   return res.status(400).json({ message: "Datos obligatorios faltantes" })
  }

  await pool.query(
   `INSERT INTO transport_orders
   (client_id, vehicle_id, driver_id, origin, destination,
    cargo_description, cargo_weight_kg, planned_date)
   VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
   [
    client_id,
    vehicle_id,
    driver_id,
    origin,
    destination,
    cargo_description,
    cargo_weight_kg,
    planned_date
   ]
  )

  res.json({ message: "Orden creada" })

 } catch (error) {

  console.error(error)
  res.status(500).json({ message: "Error creando orden" })

 }

}

// Listar órdenes con relaciones
exports.getOrders = async (req, res) => {

 try {

  const result = await pool.query(
   `SELECT o.id,
           c.name as client,
           v.plate as vehicle,
           d.full_name as driver,
           o.origin,
           o.destination,
           o.status,
           o.planned_date
    FROM transport_orders o
    LEFT JOIN clients c ON o.client_id = c.id
    LEFT JOIN vehicles v ON o.vehicle_id = v.id
    LEFT JOIN drivers d ON o.driver_id = d.id
    ORDER BY o.id DESC`
  )

  res.json(result.rows)

 } catch (error) {

  console.error(error)
  res.status(500).json({ message: "Error obteniendo órdenes" })

 }

}
