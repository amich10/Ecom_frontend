abstract class HttpService  {

    getRequest = (url:string, config:any={}) =>{
        try {
            
        } catch (exception) {
            //TODO: exception handling
            console.log("Exception:",exception)
        }
    }
    postRequest = (url:string, data: any, config:any={}) =>{

    }

    putRequest = (url:string, data: any,config:any={}) =>{
        
    }
    patchRequest = (url:string, data: any,config:any={}) =>{

    }
    delRequest = (url:string, config:any={}) =>{

    }
} //object cannot be created from abstract class only used for inheritance

export default HttpService