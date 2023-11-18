import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import router from '@/router';
import { userStore } from '@/store/user'

import { estado } from './estado';
const loading = (status: boolean) => {
    estado.carregando = status;
}

function onRequestFullFilled(config: any) {
    const user = userStore();
    const token = user.getToken();
    const empresa_token = user.getEmpresaToken();
    loading(true)
    if (!config.headers) {
        config.headers = {};
    }

    if (token && empresa_token) {
        config.headers['Authorization'] = token || '';
        config.headers['X-Authorization'] = empresa_token || '';
    }
    return config;
}

function onRequestRejected(error: any) {
    loading(false)
    return Promise.reject(error);
}

function onResponseFulfilled(response: AxiosResponse<any>) {
    loading(false)
    return response;
}

function onResponseRejected(error: any) {
    loading(false)
    if (error.response) {
        if (error.response.status == 401 || error.response.status === 403) {
            router.push({path:'/logout', params:{ expirado : true }});
        }
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Error setting up the request:', error.message);
    }
    return Promise.reject(error);
}

const http = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 60 * 6000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
});

http.interceptors.request.use(onRequestFullFilled, onRequestRejected);
http.interceptors.response.use(onResponseFulfilled, onResponseRejected);

export default http;
