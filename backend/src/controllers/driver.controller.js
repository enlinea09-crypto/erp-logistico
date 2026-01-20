const pool = require("../config/db")

// Crear conductor
exports.createDriver = async (req, res) => {

 try {

  const { full_name, license_number, phone, license_expiry } = req.body

  if (!full_name || !license_number) {
   return res.status(400).json({ message: "Nombre y licencia requeridos" })
  }

  await pool.query(
   `INSERT INTO drivers
    (full_name, license_number, phone, license_expiry)
    VALUES($1,$2,$3,$4)`,
   [full_name, license_number, phone, license_expiry]
  )

  res.json({ message: "Conductor registrado" })

 } catch (error) {

  console.error(error)
  res.status(500).json({ message: "Error registrando conductor" })

 }

}

// Listar conductores
exports.getDrivers = async (req, res) => {

 try {

  const result = await pool.query(
   "SELECT * FROM drivers ORDER BY id DESC"
  )

  res.json(result.rows)

 } catch (error) {

  console.error(error)
  res.status(500).json({ message: "Error obteniendo conductores" })

 }

}
