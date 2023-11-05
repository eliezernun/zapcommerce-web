import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import router from '@/router';

function onRequestFullFilled(config: any) {
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
    return Promise.reject(error);
}

function onResponseFulfilled(response: AxiosResponse<any>) {
    return response;
}

function onResponseRejected(error: any) {
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
    baseURL: 'http://192.168.15.61:8080',
    timeout: 60 * 6000,
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
});

http.interceptors.request.use(onRequestFullFilled, onRequestRejected);
http.interceptors.response.use(onResponseFulfilled, onResponseRejected);

export default http;
