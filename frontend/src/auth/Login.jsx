import { useState } from "react"
import erpApi from "../api/erpApi"

function Login({ onLogin }) {

 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const [error, setError] = useState("")

 const handleLogin = async () => {

  try {

   const res = await erpApi.post("/api/auth/login", {
    email,
    password
   })

   localStorage.setItem("token", res.data.token)

   onLogin()

  } catch {

   setError("Credenciales incorrectas")

  }

 }

 return (

  <div className="h-screen flex items-center justify-center bg-gray-100">

   <div className="bg-white p-8 rounded-xl shadow w-96">

    <h2 className="text-xl font-bold mb-4">
     ERP Logístico - Login
    </h2>

    <input
     className="border w-full p-2 mb-3"
     placeholder="Email"
     onChange={e => setEmail(e.target.value)}
    />

    <input
     type="password"
     className="border w-full p-2 mb-3"
     placeholder="Password"
     onChange={e => setPassword(e.target.value)}
    />

    {error && (
     <p className="text-red-500 text-sm mb-2">
      {error}
     </p>
    )}

    <button
     onClick={handleLogin}
     className="bg-blue-600 text-white w-full py-2 rounded"
    >
     Ingresar
    </button>

   </div>

  </div>

 )

}

export default Login
