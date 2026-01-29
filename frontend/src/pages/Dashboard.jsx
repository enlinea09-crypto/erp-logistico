import { useEffect, useState } from "react";
import erpApi from "../api/erpApi";

function Dashboard() {

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    orders: 0,
    vehicles: 0,
    drivers: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const ordersRes = await erpApi.get("/api/orders");
      const vehiclesRes = await erpApi.get("/api/vehicles");
      const driversRes = await erpApi.get("/api/drivers");

      setStats({
        orders: ordersRes.data.length,
        vehicles: vehiclesRes.data.length,
        drivers: driversRes.data.length
      });

    } catch (error) {

      console.error("Dashboard error:", error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return <div className="p-6">Cargando Dashboard...</div>;
  }

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        ERP Logístico — Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-4 shadow rounded">
          <h3>Órdenes</h3>
          <p className="text-2xl">{stats.orders}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3>Vehículos</h3>
          <p className="text-2xl">{stats.vehicles}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3>Conductores</h3>
          <p className="text-2xl">{stats.drivers}</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
