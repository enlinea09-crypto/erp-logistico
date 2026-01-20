import { useEffect, useState } from "react"
import erpApi from "../api/erpApi"
import Layout from "../layout/Layout"
import KpiChart from "../components/KpiChart"



function Dashboard({ setPage }) {


 const [data, setData] = useState(null)

 useEffect(() => {

  erpApi.get("/kpi/dashboard")
   .then(res => setData(res.data))

 }, [])

 if (!data) return <p>Cargando...</p>

 return (

  <Layout setPage={setPage}>

   <h1 className="text-2xl font-bold mb-4">
    Dashboard ERP Logístico
   </h1>

   <div className="grid grid-cols-4 gap-4">

    <div className="bg-white p-4 shadow rounded">
     <p>Total Ingresos</p>
     <h2>${data.finance.total_income}</h2>
    </div>

    <div className="bg-white p-4 shadow rounded">
     <p>Total Costos</p>
     <h2>${data.finance.total_cost}</h2>
    </div>

    <div className="bg-white p-4 shadow rounded">
     <p>Utilidad</p>
     <h2>${data.finance.total_profit}</h2>
    </div>

    <div className="bg-white p-4 shadow rounded">
     <p>Flota Activa</p>
     <h2>{data.active_vehicles}</h2>
    </div>

   </div>
   <div className="bg-white mt-8 p-4 rounded shadow h-[350px]">

 <h2 className="font-bold mb-3">
  Resumen Financiero
 </h2>

 <KpiChart finance={data.finance} />

</div>

  </Layout>

 )

}

export default Dashboard
