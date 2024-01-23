import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4444', // Что бы не писать весь путь
});

instance.interceptors.request.use((config) => {
    //Делаем миддлвейр для проверки авторизации, что бы не делать в каждом месте
    config.headers.Authorization = window.localStorage.getItem('token'); // Когда происходит любой запрос, проверяй токен и вшивай его в Authorization
    return config;
});

export default instance;
