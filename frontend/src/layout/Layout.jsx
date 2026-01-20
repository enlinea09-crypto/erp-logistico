import Sidebar from "../components/Sidebar"

function Layout({ children, setPage }) {

 return (

  <div className="flex min-h-screen bg-gray-100">

<Sidebar setPage={setPage} />

<main className="flex-1 p-6 h-screen overflow-auto">
    {children}
   </main>

  </div>

 )

}

export default Layout
