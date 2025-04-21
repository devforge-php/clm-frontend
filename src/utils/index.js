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
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 401 holatni tutish va login sahifasiga yo‘naltirish
$api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token"); // tokenni tozalab qo'yish
            window.location.href = "/login"; // login sahifasiga yo‘naltirish
        }
        return Promise.reject(error);
    }
);

// Admin instansiyasi
export const $apiAdmin = axios.create({
    baseURL: `${BASE_URL}`,
});

// Har bir $apiAdmin so‘rovdan oldin tokenni qo‘shish
$apiAdmin.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 401 holatni tutish va login sahifasiga yo‘naltirish
$apiAdmin.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
