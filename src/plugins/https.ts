import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import router from '@/router';
import { estado } from './estado';
const loading = (status : boolean) =>{
    estado.carregando = status;
}

function onRequestFullFilled(config: any) {
    loading(true)
    if (!config.headers) {
        config.headers = {};
    }
    /*
    const tokens = obterTokens();
    config.headers['Authorization'] = tokens?.token || '';
    config.headers['X-Authorization'] = tokens?.empresa_token || '';*/
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
            router.push('/login');
        }
        console.error('Response error:', error.response.data);
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
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
});

http.interceptors.request.use(onRequestFullFilled, onRequestRejected);
http.interceptors.response.use(onResponseFulfilled, onResponseRejected);

export default http;
