import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://tu-backend.com/api/v1' ,
    headers: {
        'Content-Type': "application/json"
    },
    withCredentials: true,
});
