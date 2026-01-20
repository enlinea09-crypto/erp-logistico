const pool = require("../config/db")

// Crear cliente
exports.createClient = async (req, res) => {

 try {

  const { name, tax_id, email, phone, address } = req.body

  if (!name) {
   return res.status(400).json({ message: "Nombre requerido" })
  }

  await pool.query(
   `INSERT INTO clients(name, tax_id, email, phone, address)
    VALUES($1,$2,$3,$4,$5)`,
   [name, tax_id, email, phone, address]
  )

  res.json({ message: "Cliente creado" })

 } catch (error) {

  console.error(error)
  res.status(500).json({ message: "Error creando cliente" })

 }

}

// Listar clientes
exports.getClients = async (req, res) => {

 try {

  const result = await pool.query(
   "SELECT * FROM clients ORDER BY id DESC"
  )

  res.json(result.rows)

 } catch (error) {

  console.error(error)
  res.status(500).json({ message: "Error obteniendo clientes" })

 }

}
