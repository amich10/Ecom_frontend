
import { FaUser } from "react-icons/fa";
import { InputLabel } from "../../components/form/input.component";
import { Checkbox } from "antd";
import {useState} from "react";
import {Input} from "antd";
import {useForm ,Controller} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"


interface ICredentialType {
  email: string;
  password: string;
  termsAndCondition: boolean;
}

const HomePage = () => {
  const [data] = useState("Login");

  const LoginDTO = Yup.object({
    email:Yup.string().email().required(),
    password:Yup.string().required(),
    termsAndCondition:Yup.boolean().required().oneOf([true]),
  })

   const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues:{
      email: "",
      password: "",
      termsAndCondition: false,
    } as  ICredentialType,
    resolver:yupResolver(LoginDTO)
   });

  const submitHandler = (data:ICredentialType) =>{
    console.log("Submit handler called")
    console.log(data)
  }
  console.log(errors)
  
  return (
    <div className="bg-violet-600 h-screen flex justify-center items-center">
      <div className="bg-white w-96 rounded-md p-4">
        <h1 className="text-violet-600 text-center font-bold text-2xl flex items-center justify-center gap-2">
          <FaUser /> {data}
        </h1>
        <form onSubmit={handleSubmit(submitHandler)}>
        <div className="mt-3">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Controller
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
          />
        </div>
        <div className="mt-3">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Controller
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
          />
        </div>
        <div className="flex justify-between mt-3 text-sm">
          <div className="flex">
            <Controller
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

            />
            <InputLabel htmlFor="terms-and-conditons">
              Agree to{" "}
              <a href="/terms-and-conditions" className="underline">
                terms and conditions
              </a>
            </InputLabel>
          </div>
          <div className="text-violet-600 font-semibold underline">
            <a href="/forget-password">Forget Password?</a>
          </div>
        </div>
        <div className="text-white font-bold  bg-violet-600 rounded-md text-center p-2 mt-3 w-full hover:text-violet-600 hover:bg-white hover:border-2 hover:border-violet-600">
          <button type="submit"> Login</button>
        </div>

        <div className="text-center text-sm mt-3">
          New user?
          <a href="/register" className="underline">
            Register here
          </a>
        </div>
        </form>
      </div>
    </div>
  );
};
export default HomePage;
