import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept:'application/json',
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response) {
            const { status } = error.response;
            if (status === 401 || status === 403) {
                // Redirect to login page if unauthorized or forbidden
                window.location.href = '/login';
            }else if(status === 500){
                console.log("Internal server error");
            }
        }
        else if(error.code === 'ECONNABORTED'){
            console.log("Request timeout");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;