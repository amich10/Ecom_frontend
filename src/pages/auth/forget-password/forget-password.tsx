import { useForm } from "react-hook-form"
import { InputLabel, SubmitButton, TextInputComponentController } from "../../../components/form/input.component"
import { NavLink, useNavigate } from "react-router"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAuth } from "../../../context/auth.context"

interface IEmailType{
    email:string
}

export const ForgetPassword = () =>{
    const forgetPasswordDTO = yup.object({
        email:yup.string().email().required()
    })

    
    const{control,handleSubmit,formState:{errors,isSubmitting}} =useForm({
        defaultValues:{
            email:""
        } as IEmailType,
        resolver:yupResolver(forgetPasswordDTO)
    })

    const navigate = useNavigate()
    const {forgetPasswordReq} = useAuth()

    const submitHandler = async(data:{email:string}) =>{
        await forgetPasswordReq(data);
        navigate('/')
    }
    return (
        <>
        <div className="h-screen flex justify-center items-center">
           <form onSubmit={handleSubmit(submitHandler)}>
           <div className="w-120 rounded-md border-2 border-violet-700 shadow-xl shadow-violet-600 p-6 font-serif">
            <h1 className="text-center text-2xl text-violet-600 font-bold ">Forget Password?</h1>
            <div className="mt-3">
            <InputLabel htmlFor="email" classes={`text-violet-600 text-lg`}>Enter your Email</InputLabel>
            <TextInputComponentController name="email" type="email" control={control} errorMsg={errors?.email?.message}/>
            </div>
            <div className="mt-4 mb-1">
                <SubmitButton isSubmitting={isSubmitting}>Continue</SubmitButton>
            </div>
                <p className="text-center mt-3 text-lg font-semibold text-violet-700">Or</p>
            <div className=" mt-3 flex flex-col items-center justify-center">
            <div>
                Already have an Account?{" "}<NavLink to="/" className="underline text-violet-600">Login Here</NavLink>
            </div>
            <div>
                Want to create a new Account?{" "}<NavLink to="/register" className="underline text-violet-600">Register Here</NavLink>
            </div>  
            </div>
            
            </div>
           </form>
        </div>
        </>
    )
}