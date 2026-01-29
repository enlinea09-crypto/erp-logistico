import axios from "axios"

const erpApi = axios.create({
    baseURL: "https://api.erp.slnebar.com/api"
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
