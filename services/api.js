import { API_URL } from '@env';
import axios from "axios";


const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // important if using cookies
});

export default api;