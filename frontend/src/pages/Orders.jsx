import { useEffect, useState } from "react"
import erpApi from "../api/erpApi"
import Layout from "../layout/Layout"

function Orders({ setPage }) {

 const [orders, setOrders] = useState([])

 const [clients, setClients] = useState([])
 const [vehicles, setVehicles] = useState([])
 const [drivers, setDrivers] = useState([])

 const [clientId, setClientId] = useState("")
 const [vehicleId, setVehicleId] = useState("")
 const [driverId, setDriverId] = useState("")
 const [origin, setOrigin] = useState("")
 const [destination, setDestination] = useState("")
 const [date, setDate] = useState("")

 const loadData = async () => {

  const ordersRes = await erpApi.get("/orders")
  const clientsRes = await erpApi.get("/clients")
  const vehiclesRes = await erpApi.get("/vehicles")
  const driversRes = await erpApi.get("/drivers")

  setOrders(ordersRes.data)
  setClients(clientsRes.data)
  setVehicles(vehiclesRes.data)
  setDrivers(driversRes.data)

 }

 useEffect(() => {

    const fetchData = async () => {
     await loadData()
    }
   
    fetchData()
   
   }, [])
   

 const createOrder = async () => {

  if (!clientId || !origin || !destination) {
   return alert("Datos obligatorios faltantes")
  }

  await erpApi.post("/orders", {
   client_id: clientId,
   vehicle_id: vehicleId,
   driver_id: driverId,
   origin,
   destination,
   planned_date: date
  })

  setClientId("")
  setVehicleId("")
  setDriverId("")
  setOrigin("")
  setDestination("")
  setDate("")

  loadData()
 }

 return (

  <Layout setPage={setPage}>

   <h1 className="text-2xl font-bold mb-4">
    Órdenes de Transporte
   </h1>

   {/* FORM */}

   <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-6 gap-3">

    <select
     className="border p-2"
     value={clientId}
     onChange={e => setClientId(e.target.value)}
    >
     <option value="">Cliente</option>
     {clients.map(c => (
      <option key={c.id} value={c.id}>{c.name}</option>
     ))}
    </select>

    <select
     className="border p-2"
     value={vehicleId}
     onChange={e => setVehicleId(e.target.value)}
    >
     <option value="">Vehículo</option>
     {vehicles.map(v => (
      <option key={v.id} value={v.id}>{v.plate}</option>
     ))}
    </select>

    <select
     className="border p-2"
     value={driverId}
     onChange={e => setDriverId(e.target.value)}
    >
     <option value="">Conductor</option>
     {drivers.map(d => (
      <option key={d.id} value={d.id}>{d.full_name}</option>
     ))}
    </select>

    <input
     className="border p-2"
     placeholder="Origen"
     value={origin}
     onChange={e => setOrigin(e.target.value)}
    />

    <input
     className="border p-2"
     placeholder="Destino"
     value={destination}
     onChange={e => setDestination(e.target.value)}
    />

    <input
     type="date"
     className="border p-2"
     value={date}
     onChange={e => setDate(e.target.value)}
    />

    <button
     onClick={createOrder}
     className="bg-blue-600 text-white rounded col-span-6"
    >
     Crear Orden
    </button>

   </div>

   {/* TABLE */}

   <div className="bg-white rounded shadow">

    <table className="w-full">

     <thead className="bg-gray-200">
      <tr>
       <th className="p-2">ID</th>
       <th className="p-2">Cliente</th>
       <th className="p-2">Vehículo</th>
       <th className="p-2">Conductor</th>
       <th className="p-2">Origen</th>
       <th className="p-2">Destino</th>
       <th className="p-2">Estado</th>
      </tr>
     </thead>

     <tbody>

      {orders.map(o => (

       <tr key={o.id} className="border-b">

        <td className="p-2 text-center">{o.id}</td>
        <td className="p-2">{o.client}</td>
        <td className="p-2">{o.vehicle}</td>
        <td className="p-2">{o.driver}</td>
        <td className="p-2">{o.origin}</td>
        <td className="p-2">{o.destination}</td>
        <td className="p-2">{o.status}</td>

       </tr>

      ))}

     </tbody>

    </table>

   </div>

  </Layout>

 )

}

export default Orders
