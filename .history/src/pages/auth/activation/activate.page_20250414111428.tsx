import { useEffect, useState } from "react"
import {Spin} from "antd"
import authSvc from "../../../services/auth.service"
import { useNavigate, useParams } from "react-router"
import { notifyUserRegistration } from "../../../utilities/helpers"

export const ActivatePage = () =>{

    const [loading] = useState<boolean>(true)
    const naviagte = useNavigate()
    const params = useParams();
    const activateUser = async () =>{
        try {
            let response = await authSvc.getRequest('/auth/activate/'+params.activationToken)
            notifyUserRegistration(response.result.message, )
        } catch (exception) {
            console.log(exception)
            notifyUserRegistration("Sorry, you account cannot be acitivated. Please try again.",'error')
        } finally{
            naviagte('/')
        }
    }
    useEffect(() =>{
        activateUser()
    },[])
    return (
        <>
        {
            loading ? <Spin  fullscreen size="large" tip="Acitvating your account ..."></Spin> : <></>
        }
        </>
    )
}