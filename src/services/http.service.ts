import axiosInstance from "../config/axios.config";
// import { WebStorageConstant } from "../config/constats";
// import { getLocalStorage } from "../utilities/helpers";


export interface IResult {
    data?: Array<Record<string, any>> | Record<string, any> | null | any, //Record<string, any> for an object with string keys and any values.
    message:string,
    error?:any,
    options:any,
    status:string,

}

export interface IResponseType {
    result: IResult 
    status:number
}


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
        // if (config.auth) {
        //     let token = getLocalStorage(WebStorageConstant.ACCESS_TOKEN)
        //     this.#headers = {
        //         ...this.#headers,
        //         "Authorization": `Bearer ${token}`
        //     };
        // }

        // Set request params if provided
        if (config.params) {
            this.#params = config.params;
        }

        this.#config = {
            headers: this.#headers,
            params: this.#params
        };
    }

    getRequest = async (url: string, config: any = {}): Promise<IResponseType> => {
        try {
            this.#setConfig(config);
            const {data : responseData ,status} = await axiosInstance.get(url, this.#config);
            
            return {
                result: responseData,
                status: status
            }
        } catch (exception:any) {   //type:any because exception may have any data type
            //console.error("GET Request Error:", exception);
            throw {
                response: exception?.response?.data,
                status: exception.response?.status
            }
        }
    };

    postRequest = async (url: string, data: any, config: any = {}):Promise<IResponseType> => {
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

    putRequest = async (url: string, data: any, config: any = {}):Promise<IResponseType> => {
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

    patchRequest = async (url: string, data: any, config: any = {}):Promise<IResponseType> => {
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

    delRequest = async (url: string, config: any = {}):Promise<IResponseType> => {
        try {
            this.#setConfig(config);
            const {data : responseData ,status} = await axiosInstance.delete(url, this.#config);
            return {
                result: responseData,
                status: status
            }
        } catch (exception:any) {
            //console.error("DELETE Request Error:", exception);
            throw {
                response: exception?.response?.data,
                status: exception.response?.status
            }
        }
    };
}

export default HttpService;
