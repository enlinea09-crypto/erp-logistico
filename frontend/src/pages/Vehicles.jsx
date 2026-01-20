import { useEffect, useState } from "react"
import erpApi from "../api/erpApi"
import Layout from "../layout/Layout"

function Vehicles({ setPage }) {

 const [vehicles, setVehicles] = useState([])

 const [plate, setPlate] = useState("")
 const [brand, setBrand] = useState("")
 const [capacity, setCapacity] = useState("")
 const [status, setStatus] = useState("activo")

 const loadVehicles = () => {

  erpApi.get("/vehicles")
   .then(res => setVehicles(res.data))

 }

 useEffect(() => {
  loadVehicles()
 }, [])

 const createVehicle = async () => {

  if (!plate) return alert("Placa requerida")

  await erpApi.post("/vehicles", {
   plate,
   brand,
   capacity_kg: capacity,
   status
  })

  setPlate("")
  setBrand("")
  setCapacity("")
  setStatus("activo")

  loadVehicles()
 }

 return (

  <Layout setPage={setPage}>

   <h1 className="text-2xl font-bold mb-4">
    Flota Vehicular
   </h1>

   {/* FORM */}

   <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-5 gap-3">

    <input
     className="border p-2"
     placeholder="Placa"
     value={plate}
     onChange={e => setPlate(e.target.value)}
    />

    <input
     className="border p-2"
     placeholder="Marca"
     value={brand}
     onChange={e => setBrand(e.target.value)}
    />

    <input
     className="border p-2"
     placeholder="Capacidad KG"
     type="number"
     value={capacity}
     onChange={e => setCapacity(e.target.value)}
    />

    <select
     className="border p-2"
     value={status}
     onChange={e => setStatus(e.target.value)}
    >
     <option value="activo">Activo</option>
     <option value="mantenimiento">Mantenimiento</option>
     <option value="inactivo">Inactivo</option>
    </select>

    <button
     onClick={createVehicle}
     className="bg-blue-600 text-white rounded"
    >
     Agregar
    </button>

   </div>

   {/* TABLE */}

   <div className="bg-white rounded shadow">

    <table className="w-full">

     <thead className="bg-gray-200">
      <tr>
       <th className="p-2">ID</th>
       <th className="p-2">Placa</th>
       <th className="p-2">Marca</th>
       <th className="p-2">Capacidad KG</th>
       <th className="p-2">Estado</th>
      </tr>
     </thead>

     <tbody>

      {vehicles.map(v => (

       <tr key={v.id} className="border-b">

        <td className="p-2 text-center">{v.id}</td>
        <td className="p-2">{v.plate}</td>
        <td className="p-2">{v.brand}</td>
        <td className="p-2">{v.capacity_kg}</td>
        <td className="p-2">{v.status}</td>

       </tr>

      ))}

     </tbody>

    </table>

   </div>

  </Layout>

 )

}

export default Vehicles
