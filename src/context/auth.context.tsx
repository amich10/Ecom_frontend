import { createContext, useContext } from "react";
import authSvc from "../services/auth.service";
import { NotificationType, notifyUserRegistration, setCookie, setLocalStorage, setSessionStorage } from "../utilities/helpers";
import { WebStorageConstant } from "../config/constats";


//create context
export interface ICredentials {
    email:string,
    password:string
}
export const AuthContext = createContext({
    login:async(_credentials:ICredentials):Promise<void> =>{}, //initail declaration
    forgetPasswordReq:async(_data:{email:string}):Promise<void> =>{}

})

//use context : example: to provide context for abc componet

/* <AuthContext.Provider value={{
    login: Function
}}>
    <abc></abc>
</AuthContext.Provider>

 */
export interface IAuthProvider {
    children: any
}
export const AuthProvider = ({children}: IAuthProvider) =>{

    const loginFunc = async(credentials: ICredentials) =>{
        try {
            // console.log(credentials) //gives email and username 
            const response =  await authSvc.postRequest('/auth/login',credentials)
            console.log(response)
            notifyUserRegistration('login Successfull',NotificationType.SUCCESS)

            setLocalStorage(WebStorageConstant.ACCESS_TOKEN,response.result.data.accessToken)
            setLocalStorage(WebStorageConstant.REFRESH_TOKEN,response.result.data.refreshToken)

            // setCookie(WebStorageConstant.ACCESS_TOKEN,response.result.data.accessToken,2)
            // setCookie(WebStorageConstant.REFRESH_TOKEN,response.result.data.refreshToken,2)

            // setSessionStorage(WebStorageConstant.ACCESS_TOKEN,response.result.data.accessToken)
            // setSessionStorage(WebStorageConstant.REFRESH_TOKEN,response.result.data.refreshToken)

        } catch (exception:any) {
            console.log("Exception :", exception) //gives message and status as set in authSvc.postRequest
            const errorMessage = exception.response?.message || 'An unexpected error occurred';
            console.log("Error message :" ,errorMessage)
            notifyUserRegistration(errorMessage, NotificationType.ERROR)
            
        }
    }

    const forgetPasswordReq = async(data:{email:string}) =>{
        //api to send forgetPassword Request

        try {
            const response = await authSvc.postRequest('/auth/forget-password',data)
            console.log(response)
            notifyUserRegistration("An email has been forwarded to your registered email to reset your password",NotificationType.SUCCESS)
        } catch (exception) {
            console.log(exception)
            notifyUserRegistration("Error occured while sending forget pasword request. Please try again later.",NotificationType.ERROR)
        }

    }
    return (
        <>
        <AuthContext.Provider value={{
            login: loginFunc,
            forgetPasswordReq
        }}>
            {children}
        </AuthContext.Provider>
        </>
    )
}

export const useAuth = () =>{  //custom hook
    return useContext(AuthContext)
}