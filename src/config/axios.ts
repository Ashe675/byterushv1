import axios from "axios";

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials : true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api