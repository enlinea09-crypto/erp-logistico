import { useState } from "react"
import Login from "./auth/Login"
import Dashboard from "./pages/Dashboard"
import Clients from "./pages/Clients"
import Vehicles from "./pages/Vehicles"
import Orders from "./pages/Orders"
import Tracking from "./pages/Tracking"



function App() {

 const [auth, setAuth] = useState(
  localStorage.getItem("token") ? true : false
 )

 const [page, setPage] = useState("dashboard")

 if (!auth) {
  return <Login onLogin={() => setAuth(true)} />
 }

 if (page === "clients") {
    return <Clients setPage={setPage} />
 }

 if (page === "vehicles") {
   return <Vehicles setPage={setPage} />
  }

  if (page === "orders") {
   return <Orders setPage={setPage} />
  }
  
  if (page === "tracking") {
   return <Tracking setPage={setPage} />
  }
  

 return <Dashboard setPage={setPage} />

}

export default App
