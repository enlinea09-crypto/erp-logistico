const pool = require("../config/db")

// Crear vehículo
exports.createVehicle = async (req, res) => {

 try {

  const { plate, brand, model, year, capacity_kg, owner_type } = req.body

  if (!plate) {
   return res.status(400).json({ message: "Placa requerida" })
  }

  await pool.query(
   `INSERT INTO vehicles
    (plate, brand, model, year, capacity_kg, owner_type)
    VALUES($1,$2,$3,$4,$5,$6)`,
   [plate, brand, model, year, capacity_kg, owner_type]
  )

  res.json({ message: "Vehículo registrado" })

 } catch (error) {

  console.error(error)
  res.status(500).json({ message: "Error registrando vehículo" })

 }

}

// Listar vehículos
exports.getVehicles = async (req, res) => {

 try {

  const result = await pool.query(
   "SELECT * FROM vehicles ORDER BY id DESC"
  )

  res.json(result.rows)

 } catch (error) {

  console.error(error)
  res.status(500).json({ message: "Error obteniendo vehículos" })

 }

}
