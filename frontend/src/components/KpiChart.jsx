import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
   } from "chart.js"
   
   import { Bar } from "react-chartjs-2"
   
   ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
   )
   
   function KpiChart({ finance }) {
   
    const data = {
     labels: ["Ingresos", "Costos", "Utilidad"],
     datasets: [
      {
       label: "Resumen Financiero",
       data: [
        Number(finance.total_income),
        Number(finance.total_cost),
        Number(finance.total_profit)
    ],
       backgroundColor: [
        "#2563eb",
        "#dc2626",
        "#16a34a"
       ]
      }
     ]
    }
   
    const options = {
     responsive: true,
     maintainAspectRatio: false,
     plugins: {
      legend: {
       display: false
      }
     }
    }
   
    return <Bar data={data} options={options} />
   }
   
   export default KpiChart
   