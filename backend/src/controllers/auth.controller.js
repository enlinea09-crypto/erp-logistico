const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.login = async (req, res) => {

 // 👇 AQUÍ VA "ARRIBA DEL LOGIN"
 console.log("REQ HEADERS:", req.headers)
 console.log("REQ BODY:", req.body)

 try {

  if (!req.body) {
   return res.status(400).json({ message: "Body vacío" })
  }

  const { email, password } = req.body

  if (!email || !password) {
   return res.status(400).json({ message: "Email y password requeridos" })
  }

  const result = await pool.query(
   "SELECT * FROM users WHERE email = $1",
   [email]
  )

  if (result.rows.length === 0) {
   return res.status(401).json({ message: "Usuario no encontrado" })
  }

  const user = result.rows[0]

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
   return res.status(401).json({ message: "Password incorrecto" })
  }

  const token = jwt.sign(
   { id: user.id },
   process.env.JWT_SECRET,
   { expiresIn: "8h" }
  )

  res.json({ token })

 } catch (error) {

  console.error("LOGIN ERROR:", error)
  res.status(500).json({ message: "Error interno" })

 }

}
