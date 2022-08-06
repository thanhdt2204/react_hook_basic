import axios from 'axios';
import { getEnv } from "../config/env";
import { storage } from '../utils/constant';

const instance = axios.create({
    baseURL: `${getEnv("HOST_API")}`,
})

instance.interceptors.response.use(
    response => {
        return {
            status: 200,
            data: response.data,
            message: ''
        }
    },
    error => {
        return {
            status: error.response.status,
            data: '',
            message: error.response.status === 400 ? error.response.data : error.response.data.message
        }
    }
);

instance.interceptors.request.use(function (config) {
    const item = JSON.parse(localStorage.getItem(storage.STORAGE_KEY));
    const token = item && item.token ? "Bearer " + item.token : "";
    config.headers.Authorization = token;
    return config;
});

export default instance;