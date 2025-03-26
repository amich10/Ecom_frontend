import { Button,message,Upload} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { NavLink } from "react-router"
import { AddressInputController, InputLabel, PasswordInputComponentController, RadioInputController, SelectInputController } from "../../../components/form/input.component";
import { useForm } from "react-hook-form";
import { TextInputComponentController } from "../../../components/form/input.component";

export const RegisterPage  = () =>{

    const {control,handleSubmit, formState:{errors, isSubmitting}} = useForm({
        defaultValues:{
            fullName:"",
            email:"",
            password:"",
            confirmPassword:"",
            role:"",
            gender:"",
            address:"",
            phone:""
        }
    })

    const formSubmit = (data:any) =>{

        //submit
        console.log(data)
    }
    const props:UploadProps = {
        name:"file",
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
          },
        onChange(info) {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          },
    }
    return(
        <>
       <div className="flex justify-center h-screen items-center py-10">
        <div className="w-96 bg-white rounded-md p-4 shadow-2xl  shadow-violet-400 border-2 border-violet-700 font-serif">
        <h1 className="text-center text-2xl font-bold text-violet-800 mb-6 animate-pulse">Register Now</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <InputLabel htmlFor="fullName">Full Name</InputLabel>
                    <TextInputComponentController type="text"  name="fullName" control={control} errorMsg={errors?.fullName?.message}/>
                </div>
                <div>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <TextInputComponentController type="email"  name="email" control={control} errorMsg={errors?.email?.message}/>
                </div>
                <div>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <PasswordInputComponentController control={control} id="password" type="password" errorMsg={errors?.password?.message}/>
                </div>
                <div>
                <InputLabel htmlFor="confirmPassword">Re-Password</InputLabel>
                <PasswordInputComponentController control={control} id="confirmPassword" type="password" errorMsg={errors?.password?.message}/>
                </div>
                <div className="sm:col-span-2">
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <AddressInputController name="address"  rows={2} maxRows={3} control={control} erroMsg={errors?.address?.message} />
                </div>
            </div>    
                <div className="mt-3">
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <TextInputComponentController type="phone" name="phone" control={control} errorMsg={errors?.phone?.message}/>
                    {/* <Input type="phone" minLength={10} maxLength={10} name="phone" id="phone" placeholder="Enter your 10 digit phone number"/> */}
                </div>

            <div className="mt-3 flex items-center space-x-2">
            <InputLabel htmlFor="role">Select role :</InputLabel>
                <RadioInputController control={control} errorMsg={errors?.role?.message} name="role" options={[{
                    value:"buyer",
                    label:"buyer"
                },
                {
                    value:"seller",
                    label:"seller"
                }
                ]}/>
            </div>

            <div className="mt-3">
            <InputLabel htmlFor="gender">Gender :</InputLabel>
                <SelectInputController control={control} errorMsg={errors?.gender?.message} name="gender" options={[
                    {
                        value:"male",
                        label:"male"
                    },
                    {   
                        value:"female",
                        label:"female"
                    },
                    {
                        value:"other",
                        label:"other"
                    }

                ]}/>    
            </div>

            <div className="mt-3">
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
            </Upload>
            </div>

            <div className="mt-3 text-center">
                    <Button type="primary" className="bg-violet-700! w-full font-bold h-9! text-[17px]!"><b>Register</b></Button>
            </div>
            <div className="mt-3 text-center text-sm">
                Already have an account?{" "}<NavLink to={"/"} className="underline text-violet-800 font-semibold"> Sign in</NavLink>
            </div>
        </form>
    </div>
</div>

        </>
    )
}