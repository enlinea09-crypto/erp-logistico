import { useEffect, useState } from "react"
import Layout from "../layout/Layout"
import erpApi from "../api/erpApi"
import { useMap } from "react-leaflet"


function FixMapSize() {
    const map = useMap()
    useEffect(() => {
    setTimeout(() => {
     map.invalidateSize()
    }, 300)
},[])
    return null
   }
   

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

function Tracking({ setPage }) {

 const [orders, setOrders] = useState([])
 const [tracking, setTracking] = useState([])
 const [selectedOrder, setSelectedOrder] = useState("")

 const loadOrders = async () => {

  const res = await erpApi.get("/orders")
  setOrders(res.data)

 }

 const loadTracking = async (orderId) => {

  const res = await erpApi.get(`/tracking/${orderId}`)
  setTracking(res.data)

 }

 useEffect(() => {

  const fetchOrders = async () => {
   await loadOrders()
  }

  fetchOrders()

 }, [])

 const handleOrderChange = (e) => {

  const id = e.target.value
  setSelectedOrder(id)

  if (id) {
   loadTracking(id)
  }

 }

 return (

  <Layout setPage={setPage}>

   <h1 className="text-2xl font-bold mb-4">
    Tracking GPS
   </h1>

   {/* SELECT ORDER */}

   <div className="bg-white p-4 rounded shadow mb-4">

    <select
     className="border p-2"
     value={selectedOrder}
     onChange={handleOrderChange}
    >

     <option value="">Seleccionar Orden</option>

     {orders.map(o => (
      <option key={o.id} value={o.id}>
       Orden #{o.id} - {o.origin} → {o.destination}
      </option>
     ))}

    </select>

   </div>

   {/* MAP */}

   <div className="bg-white rounded shadow h-[70vh] relative">


    <MapContainer
     center={[-33.45, -70.66]}
     zoom={6}
     className="h-full w-full"
    >
    <FixMapSize />

     <TileLayer
      attribution="&copy; OpenStreetMap"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />

     {tracking.map(t => (

      <Marker
       key={t.id}
       position={[t.latitude, t.longitude]}
      >

       <Popup>
        Velocidad: {t.speed_kmh} km/h
       </Popup>

      </Marker>

     ))}

    </MapContainer>

   </div>

  </Layout>

 )

}

export default Tracking
