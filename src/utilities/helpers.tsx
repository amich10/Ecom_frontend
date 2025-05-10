import { toast } from "react-toastify";

export enum NotificationType {
    SUCCESS = "success",
    ERROR ="error",
    WARNING = "warning",
    INFO = "info"
}

export const notifyUserRegistration= (msg: string, type: NotificationType) => {
    if (type === "success") {
        toast.success(msg);
    } else if (type === "error") {
        toast.error(msg);
    } else if (type === "warning") {
        toast.warning(msg);
    } else if (type === "info") {
        toast.info(msg);
    }else[
        toast(msg)
    ]
};

//cookie for webstorage
export const setCookie = (name:string, value:string, exdays:number) =>{
    document.cookie = `${name}=${value}; expires=${new Date(Date.now() + exdays * 86400000)};` //1 day = 24 * 60 * 60 * 1000milisec
}

export const getCookie = (name:string) =>{
    const cookies = document.cookie;

    //token=ascdaca; name=adacacadcwv;
    let data: string = "";
    if(cookies){
        let cookieValue = cookies.split("; ") //['token=asacaead','name=acafawa']
        cookieValue.map((cookie) =>{ //name=value
           const [key,value] = cookie.split('=')

           if(key===name){
            data = value;
           }

        })
    }
    return data;
}

//session storage
//set session storage
export const setSessionStorage = (name:string,value:string) =>{
    sessionStorage.setItem(name,value)
}
//get localstrage
export const getSessionStorage = (name:string) =>{
    sessionStorage.getItem(name)
}

//remove from session storage
export const remSessioncalStorage = (name:string) =>{
    sessionStorage.removeItem(name)
}

//clean all data or remove
export const fluSessionalStorage =() =>{
    sessionStorage.clean()
}


////local storage
//set local storage
export const setLocalStorage = (name:string,value:string) =>{
    return localStorage.setItem(name,value)
}
//get localstrage
export const getLocalStorage = (name:string) =>{
    return localStorage.getItem(name)
}

//remove from session storage
export const removeLocalStorage = (name:string) =>{
    return localStorage.removeItem(name);
}

//clean all data or remove
export const flushLocalStorage =() =>{
    return localStorage.clear()
}