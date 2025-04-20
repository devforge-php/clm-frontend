import axios from "axios";

export const BASE_URL = "https://backendclm.uz";

// Umumiy instansiya
export const $axios = axios.create({
    baseURL: `${BASE_URL}/api`,
});

// Auth instansiyasi
export const $api = axios.create({
    baseURL: `${BASE_URL}/api`,
});

// Har bir $api so‘rovdan oldin tokenni qo‘shish
$api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // tokenni har safar olish
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Auth instansiyasi
export const $apiAdmin = axios.create({
    baseURL: `${BASE_URL}`,
});

// Har bir $apiAdmin so‘rovdan oldin tokenni qo‘shish
$apiAdmin.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // tokenni har safar olish
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
