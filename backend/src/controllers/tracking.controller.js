const pool = require("../config/db")

// Insertar posición (simula GPS)
exports.createTracking = async (req, res) => {

 try {

  const { order_id, latitude, longitude, speed_kmh } = req.body

  if (!order_id || !latitude || !longitude) {
   return res.status(400).json({ message: "Datos GPS incompletos" })
  }

  await pool.query(
   `INSERT INTO tracking
    (order_id, latitude, longitude, speed_kmh)
    VALUES($1,$2,$3,$4)`,
   [order_id, latitude, longitude, speed_kmh]
  )

  res.json({ message: "Posición registrada" })

 } catch (error) {

  console.error(error)
  res.status(500).json({ message: "Error registrando tracking" })

 }

}

// Obtener historial de tracking por orden
exports.getTrackingByOrder = async (req, res) => {

 try {

  const { orderId } = req.params

  const result = await pool.query(
   `SELECT * FROM tracking
    WHERE order_id = $1
    ORDER BY recorded_at DESC`,
   [orderId]
  )

  res.json(result.rows)

 } catch (error) {

  console.error(error)
  res.status(500).json({ message: "Error obteniendo tracking" })

 }

}
