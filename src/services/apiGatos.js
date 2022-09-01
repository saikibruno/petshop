import axios from "axios";

const apiGatos = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/breeds',    
})

export default apiGatos