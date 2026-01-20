function Sidebar({ setPage }) {

    const logout = () => {
     localStorage.removeItem("token")
     window.location.reload()
    }
   
    return (
   
     <div className="w-64 bg-blue-700 text-white min-h-screen p-4">
   
      <h2 className="text-xl font-bold mb-6">
       ERP Logístico
      </h2>
   
      <ul className="space-y-3">
   
       <li
        onClick={() => setPage("dashboard")}
        className="hover:bg-blue-600 p-2 rounded cursor-pointer"
       >
        Dashboard
       </li>
   
       <li
        onClick={() => setPage("clients")}
        className="hover:bg-blue-600 p-2 rounded cursor-pointer"
       >
        Clientes
       </li>
   
       <li
        onClick={() => setPage("vehicles")}
        className="hover:bg-blue-600 p-2 rounded cursor-pointer"
        >
        Flota
        </li>

        <li
        onClick={() => setPage("orders")}
        className="hover:bg-blue-600 p-2 rounded cursor-pointer"
        >
        Órdenes
        </li>

        <li
        onClick={() => setPage("tracking")}
        className="hover:bg-blue-600 p-2 rounded cursor-pointer"
        >
        Tracking GPS
        </li>

   
       <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">
        Facturación
       </li>
   
       <li
        onClick={logout}
        className="hover:bg-red-500 p-2 rounded cursor-pointer mt-8"
       >
        Cerrar sesión
       </li>
   
      </ul>
   
     </div>
   
    )
   
   }
   
   export default Sidebar
   