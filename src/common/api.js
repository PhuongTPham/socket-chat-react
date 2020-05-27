import axios from 'axios'

const BASE_URL= 'https://jsonplaceholder.typicode.com'

const API = {
    get(url){
        return axios.get(`${BASE_URL}${url}`)
    },
    post(url, params){
        return axios.post(`${BASE_URL}${url}`,params)
    },
    put(url, params){
        return axios.put(`${BASE_URL}${url}`, params)
    },
    delete(url, params){
        return axios.delete(`${BASE_URL}${url}`, params)
    }
};

export default API;