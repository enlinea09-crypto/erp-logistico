import { useEffect, useState } from "react"
import erpApi from "../api/erpApi"
import Layout from "../layout/Layout"

function Clients({ setPage }) {

 const [clients, setClients] = useState([])
 const [name, setName] = useState("")
 const [email, setEmail] = useState("")
 const [phone, setPhone] = useState("")

 const loadClients = () => {

  erpApi.get("/clients")
   .then(res => setClients(res.data))

 }

 useEffect(() => {
  loadClients()
 }, [])

 const createClient = async () => {

  if (!name) return alert("Nombre requerido")

  await erpApi.post("/clients", {
   name,
   email,
   phone
  })

  setName("")
  setEmail("")
  setPhone("")

  loadClients()
 }

 return (

    <Layout setPage={setPage}>

   <h1 className="text-2xl font-bold mb-4">
    Clientes
   </h1>

   {/* FORMULARIO */}

   <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-4 gap-3">

    <input
     className="border p-2"
     placeholder="Nombre"
     value={name}
     onChange={e => setName(e.target.value)}
    />

    <input
     className="border p-2"
     placeholder="Email"
     value={email}
     onChange={e => setEmail(e.target.value)}
    />

    <input
     className="border p-2"
     placeholder="Teléfono"
     value={phone}
     onChange={e => setPhone(e.target.value)}
    />

    <button
     onClick={createClient}
     className="bg-blue-600 text-white rounded"
    >
     Agregar
    </button>

   </div>

   {/* TABLA */}

   <div className="bg-white rounded shadow">

    <table className="w-full">

     <thead className="bg-gray-200">
      <tr>
       <th className="p-2">ID</th>
       <th className="p-2">Nombre</th>
       <th className="p-2">Email</th>
       <th className="p-2">Teléfono</th>
      </tr>
     </thead>

     <tbody>

      {clients.map(c => (

       <tr key={c.id} className="border-b">

        <td className="p-2 text-center">{c.id}</td>
        <td className="p-2">{c.name}</td>
        <td className="p-2">{c.email}</td>
        <td className="p-2">{c.phone}</td>

       </tr>

      ))}

     </tbody>

    </table>

   </div>

  </Layout>

 )

}

export default Clients
