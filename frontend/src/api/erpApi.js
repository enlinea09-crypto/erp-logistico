import axios from "axios"

const erpApi = axios.create({
 baseURL: "https://erp-logistico-production.up.railway.app"
})

// Interceptor JWT
erpApi.interceptors.request.use(config => {

 const token = localStorage.getItem("token")

 if (token) {
  config.headers.Authorization = `Bearer ${token}`
 }

 return config
})

export default erpApi
