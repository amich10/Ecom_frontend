import axiosInstance from "../config/axios.config";

abstract class HttpService {
    #headers: any = {};
    #params: any = {};
    #config: any = {
        headers: this.#headers,
        params: this.#params
    };

    #setConfig(config: any) {
        this.#headers = {
            "Content-Type": "application/json",
            ...this.#headers // Preserve existing headers
        };

        // File upload check
        if (config.file || config.files) {
            this.#headers = {
                ...this.#headers, // Preserve previous headers
                "Content-Type": "multipart/form-data"
            };
        }

        // Authorization token check
        if (config.auth && config.auth.token) {
            this.#headers = {
                ...this.#headers,
                "Authorization": `Bearer ${config.auth.token}`
            };
        }

        // Set request params if provided
        if (config.params) {
            this.#params = config.params;
        }

        this.#config = {
            headers: this.#headers,
            params: this.#params
        };
    }

    getRequest = async (url: string, config: any = {}) => {
        try {
            this.#setConfig(config);
            const {data : responseData ,status} = await axiosInstance.get(url, this.#config);
            return {
                result: responseData,
                status: status
            }
        } catch (exception) {
            console.error("GET Request Error:", exception);
            throw exception;
        }
    };

    postRequest = async (url: string, data: any, config: any = {}) => {
        try {
            this.#setConfig(config);
            const {data : responseData ,status} = await axiosInstance.post(url, data, this.#config);
            return {
                result: responseData,
                status: status
            }
        } catch (exception: any) {
            //console.error("POST Request Error:", exception);
            throw {
                response: exception?.response?.data,
                status: exception.response?.status
            }
        }
    };

    putRequest = async (url: string, data: any, config: any = {}) => {
        try {
            this.#setConfig(config);
            const {data : responseData ,status} = await axiosInstance.put(url, data, this.#config);
            return {
                result: responseData,
                status: status
            }
        } catch (exception:any) {
            throw {
                response: exception?.response?.data,
                status: exception.response?.status
            }
        }
    };

    patchRequest = async (url: string, data: any, config: any = {}) => {
        try {
            this.#setConfig(config);
            const  {data : responseData ,status} = await axiosInstance.patch(url, data, this.#config);
            return {
                result: responseData,
                status: status
            }
        } catch (exception:any) {
            throw {
                response: exception?.response?.data,
                status: exception.response?.status
            }
        }
    };

    delRequest = async (url: string, config: any = {}) => {
        try {
            this.#setConfig(config);
            const response = await axiosInstance.delete(url, this.#config);
            return response.data;
        } catch (exception) {
            console.error("DELETE Request Error:", exception);
            throw exception;
        }
    };
}

export default HttpService;
