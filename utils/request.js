import axios from 'axios';
const BASE_URL = import.meta.env.V__BASE_URL;
const [ACCESS_USER, ACCESS_KEY] = [import.meta.env.V__ACCESS_API_ID, import.meta.env.V__ACCESS_API_KEY]

// create an axios instance
const service = axios.create({
    baseURL: BASE_URL,
    timeout: 30000
})

// request interceptor
service.interceptors.request.use(
    config => {
        config.auth = {
            username : ACCESS_USER,
            password : ACCESS_KEY
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    async res => {
        if (res.data && parseInt(res.data.code) === 0) {
            return res.data.data
        } else {
            return Promise.reject(res.data ? res.data : new Error());
        }
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service;