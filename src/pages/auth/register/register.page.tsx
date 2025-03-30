import { Button, Upload} from "antd";
import { NavLink } from "react-router";
import {
  AddressInputController,
  InputLabel,
  PasswordInputComponentController,
  RadioInputController,
  SelectInputController,
} from "../../../components/form/input.component";
import { useForm } from "react-hook-form";
import { TextInputComponentController } from "../../../components/form/input.component";
import type { UploadProps, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../../config/axios.config";
import authSvc from "../../../services/auth.service";

export const RegisterPage = () => {
  const RegisterDTO = Yup.object({
    fullName: Yup.string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name cannot exceed 50 characters")
      .required("Full name is required"),
    
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*>-])[a-zA-Z\d!@#$%^&*>-]{8,25}$/,
        "Password must be 8-25 characters, include at least one uppercase, one lowercase, one number, and one special character"
      )
      .required("Password is required"),
  
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  
    role: Yup.string()
      .matches(/^(customer|seller)$/, "Role must be either 'customer' or 'seller'")
      .default("customer")
      .required("Role is required"),
  
    gender: Yup.string()
      .matches(/^(male|female|other)$/, "Gender must be 'male', 'female', or 'other'")
      .required("Gender is required"),
  
    address: Yup.string()
      .required("Address is required"),
  
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
  
    image: Yup.mixed()
      .nullable()
      .optional(),
  });
  

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }, setValue
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      gender: "",
      address: "",
      phone: "",
      image:null
    },
    resolver:yupResolver(RegisterDTO)
  });

  const formSubmit = async (data: any) => {
    //submit
    console.log(data);

    const response = await authSvc.postRequest('/auth/register',data,{file:true})

    /* let response = await axiosInstance.post('/auth/register',data,{
      headers:{
        "Content-Type":"multipart/form-data"
      },
      // params: {}
    })*/
    console.log(response)

    try {
      
    } catch (exception) {
      console.log(exception)
    }
  };


  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      console.log(file)
      setFileList([file]);
      setValue('image', file as any)
      return false;
    },
    fileList,
  };



  return (
    <>
      <div className="flex justify-center h-screen items-center py-10">
        <div className="w-96 bg-white rounded-md p-4 shadow-2xl  shadow-violet-400 border-2 border-violet-700 font-serif">
          <h1 className="text-center text-2xl font-bold text-violet-800 mb-6 animate-pulse">
            Register Now
          </h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <InputLabel htmlFor="fullName">Full Name</InputLabel>
                <TextInputComponentController
                  type="text"
                  name="fullName"
                  control={control}
                  errorMsg={errors?.fullName?.message}
                />
              </div>
              <div>
                <InputLabel htmlFor="email">Email</InputLabel>
                <TextInputComponentController
                  type="email"
                  name="email"
                  control={control}
                  errorMsg={errors?.email?.message}
                />
              </div>
              <div>
                <InputLabel htmlFor="password">Password</InputLabel>
                <PasswordInputComponentController
                  control={control}
                  id="password"
                  type="password"
                  errorMsg={errors?.password?.message}
                />
              </div>
              <div>
                <InputLabel htmlFor="confirmPassword">Re-Password</InputLabel>
                <PasswordInputComponentController
                  control={control}
                  id="confirmPassword"
                  type="password"
                  errorMsg={errors?.confirmPassword?.message}
                />
              </div>
              <div className="sm:col-span-2">
                <InputLabel htmlFor="address">Address</InputLabel>
                <AddressInputController
                  name="address"
                  rows={2}
                  maxRows={3}
                  control={control}
                  erroMsg={errors?.address?.message}
                />
              </div>
            </div>
            <div className="mt-3">
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <TextInputComponentController
                type="phone"
                name="phone"
                control={control}
                errorMsg={errors?.phone?.message}
              />
              {/* <Input type="phone" minLength={10} maxLength={10} name="phone" id="phone" placeholder="Enter your 10 digit phone number"/> */}
            </div>

            <div className="mt-3 flex items-center space-x-2">
              <InputLabel htmlFor="role">Select role :</InputLabel>
              <RadioInputController
                control={control}
                errorMsg={errors?.role?.message}
                name="role"
                options={[
                  {
                    value: "customer",
                    label: "buyer",
                  },
                  {
                    value: "seller",
                    label: "seller",
                  },
                ]}
              />
            </div>

            <div className="mt-3">
              <InputLabel htmlFor="gender">Gender :</InputLabel>
              <SelectInputController
                control={control}
                errorMsg={errors?.gender?.message}
                name="gender"
                options={[
                  {
                    value: "male",
                    label: "male",
                  },
                  {
                    value: "female",
                    label: "female",
                  },
                  {
                    value: "other",
                    label: "other",
                  },
                ]}
              />
            </div>

            <div className="mt-3">
              <InputLabel htmlFor="image" classes={`block`}> Profile Image</InputLabel>

              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
                {/* <input
                  type="file" 
                  name="image"
                  accept="image/*"
                  title="Upload your profile image"
                  onChange={(event:any) =>{
                    // console.log(event.target.files[0]) //gives json data of image
                    console.log(event.target.value) //gives fakepath C:\fakepath\mt1.png
                  }}
                /> */}

            {/* <Upload {...props}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload> */}
            </div>

            <div className="mt-3 text-center">
              <Button
                type="primary"
                disabled={isSubmitting}
                className="bg-violet-700! w-full font-bold h-9! text-[17px]!"
                htmlType="submit"
              >
                <b>Register</b>
              </Button>
            </div>
            <div className="mt-3 text-center text-sm">
              Already have an account?{" "}
              <NavLink
                to={"/"}
                className="underline text-violet-800 font-semibold"
              >
                {" "}
                Sign in
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
