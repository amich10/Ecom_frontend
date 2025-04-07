
import { FaUser } from "react-icons/fa";
import { InputLabel, PasswordInputComponentController, SubmitButton, TextInputComponentController } from "../../components/form/input.component";
import { Button } from "antd";
import {useState} from "react";
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { NavLink } from "react-router";
import { useAuth, ICredentials } from "../../context/auth.context";


const HomePage = () => {
  const [data] = useState("Login");

  const LoginDTO = Yup.object({
    email:Yup.string().email().required(),
    password:Yup.string().required(),
    // termsAndCondition:Yup.boolean().required().oneOf([true]),
  })

   const {control, handleSubmit, formState: {errors,isSubmitting}} = useForm({
    defaultValues:{
      email: "",
      password: "",
      // termsAndCondition: false,
    } as  ICredentials,
    resolver:yupResolver(LoginDTO)
   });


   const {login} = useAuth()
  // const submitHandler = (data:ICredentialType) =>{
  //   console.log("Submit handler called")
  //   console.log(data)
  // }

   const submitLogin = async (data)

  console.log(errors)
  
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white shadow-2xl shadow-violet-400 border-2 border-violet-600 w-120 rounded-md p-4 font-serif">
        <h1 className="text-violet-600 text-center font-bold text-2xl flex items-center justify-center gap-2">
          <FaUser /> {data}
        </h1>
        <form onSubmit={handleSubmit(login)}>
        <div className="mt-3">
          <InputLabel htmlFor="email">Email</InputLabel>
          {/* <Controller
            control={control}
            name="email"
            // defaultValue=""
            render={({field}) =>{
              // console.log(field)
              return(
                <>
                <Input
                type="email"
                id="email"
                {...field}
                status={errors?.email ? "error": ''}
                placeholder="example@example.com"
                />
                <span className="text-sm text-red-400 italic">{errors?.email?.message}</span>
                </>
              )
            }}
          /> */}

          <TextInputComponentController 
            name="email"
            control={control}
            type="email"
            errorMsg={errors?.email?.message}
          />
        </div>
        <div className="mt-3">
          <InputLabel htmlFor="password">Password</InputLabel>
          {/* <Controller
            control={control}
            name="password"
            // defaultValue=""
            render={({field}) =>{
              // console.log(field)
              return(
                <>
                <Input.Password
                id="password"
                {...field}
                status={errors?.password ? "error" : ''}
                placeholder="Enter your password here ..."
                />
                 <span className="text-sm text-red-400 italic">{errors?.password?.message}</span>
                </>
              )
            }}
          /> */}
          <PasswordInputComponentController 
          type="password"
          id="password"
          control={control}
          errorMsg={errors?.password?.message}
          />
        </div>
        <div className="flex justify-between mt-3 text-sm">
          <div className="flex">
            {/* <Controller
              control={control}
              name="termsAndCondition"
              render={({field}) =>{
                // console.log(field)
                return(
                  <>
                  <Checkbox
                    id="termsAndCondition"
                    {...field}
                    className="mr-1!"
                    checked={field.value}
                  />
                  </>
                )
              }}

            /> */}
            <InputLabel htmlFor="terms-and-conditons">
              By loggin I agree to the {" "}
              <NavLink  target="_blank" to="/terms-and-conditions" className="underline">  
                terms and conditions
              </NavLink>
              {/* use anchor tag when you want to redirect from your app to external resources */}
            </InputLabel>
          </div>
          <div className="text-violet-600 font-semibold underline">
            <a href="/forget-password">Forget Password?</a>
          </div>
        </div>
        <div className="mt-3
        ">
          <SubmitButton isSubmitting={isSubmitting} classes="">Login</SubmitButton>
        </div>

        <div className="text-center text-sm mt-3">
          New user? {" "}
          <NavLink to="/register" className="font-bold text-violet-600 underline">Register here</NavLink>
        </div>
        </form>
      </div>
    </div>
  );
};
export default HomePage;
