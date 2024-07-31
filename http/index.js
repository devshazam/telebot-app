import axios from "axios";

const $authHost = axios.create({
    baseURL: "https://315f-80-90-179-8.ngrok-free.app/"
    // baseURL: "https://telebot-app.kopi34.ru/"
})

const $host = axios.create({
    baseURL: "https://kopi34.ru/"
})

// const authInterceptor = config => {
//     config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
// }

// $authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}