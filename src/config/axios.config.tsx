import axios from "axios"
import { getLocalStorage } from "../utilities/helpers";
import { WebStorageConstant } from "./constats";

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    timeout: 30000, //in millisec = 30 sec
    timeoutErrorMessage:"Request time out",
    responseEncoding:"utf-8",
    responseType:"json",
    // method:"GET,POST,PUT,PATCH,DELETE,OPTIONS"
})

//interceptiors (bearer token)

//adding in request
axiosInstance.interceptors.request.use((config) => {  //congfig => axiosConfig
    let token = getLocalStorage(WebStorageConstant.ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;

})

//adding interceptors in repsonse

export default axiosInstance;
