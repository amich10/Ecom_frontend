import { useForm } from "react-hook-form";
import { CancelButton, FormSingleImageUploader, InputLabel, SelectInputController, SubmitButton, TextInputComponentController } from "../../components/form/input.component";
import { ReloadOutlined, SendOutlined } from "@ant-design/icons";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { Spin } from "antd";
import { useEffect, useState } from "react";


export interface IBrandData {
    title: string,
    status: string,
    image?: any,
    url: string
}
interface IformProps{
    submitEvent: (data:IBrandData) => Promise <void>;
    brand?:IBrandData
}

const BrandForm = ({submitEvent,brand}: IformProps) =>{



    const brandValidaterDTo =yup.object({
        title: yup.string().min(3).max(100).required(),
        url:yup.string().default('').required(),
        status:yup.string().required(), //matches(/^(active|inactive) &/).default('inactive')
        image:yup.mixed().nullable()
    })
    const {handleSubmit,control,formState:{errors,isSubmitting},setValue,reset} = useForm({
        defaultValues:{
            title:"",
            status:"",
            url:"",
            image:null
        },
        resolver: yupResolver(brandValidaterDTo),
        // resetOptions:{
        //     keepValues:false,
        //     keepErrors:false,
        //     keepDefaultValues:false
        // }
    })

    const [thumbnail,setThumbnail] =useState<string>()

    useEffect(() =>{

       if(brand){ //removes undefined
        setValue('title',brand?.title)
        setValue('status',brand?.status),
        // setValue('image',brand?.image) //image yesari mildaina
        setThumbnail(brand?.image?.optimizedUrl)
        setValue('url',brand?.url)
       }
    },[brand])
    
    return (
        <>
        {isSubmitting ? <Spin fullscreen></Spin>:<></>}
        <form onSubmit={handleSubmit(submitEvent)} onReset={() =>{
            reset()
        }} className="font-serif">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <div className="w-1/4 text-lg"> <InputLabel htmlFor="title">Title :</InputLabel></div>
                    <div className="w-3/4"><TextInputComponentController name="title" type="text" control={control} errorMsg={errors.title?.message}/></div>
                </div>
                <div className="flex justify-between">
                    <div className="w-1/4 text-lg"> <InputLabel htmlFor="url">Url :</InputLabel></div>
                    <div className="w-3/4"><TextInputComponentController name="url" type="text" control={control} errorMsg={errors.url?.message}/></div>
                </div>
                <div className="flex justify-between">
                    <div className="w-1/4 text-lg"> <InputLabel htmlFor="status">Status :</InputLabel></div>
                    <div className="w-3/4"><SelectInputController name="status" control={control} errorMsg={errors?.status?.message} 
                    options={[
                        {label:"publish", value:"active"},
                        {label:"unpublish", value:"inactive"}
                    ]}/></div>
                </div>
                <div className=" flex">
                    <div className="w-1/4 text-lg"> <InputLabel htmlFor="image">Image :</InputLabel></div>
                    <div className="w-3/4"> <FormSingleImageUploader name="image" thumbnail={thumbnail}
                    setValue={(name:string, file:any) => setValue(name as keyof IBrandData, file)}/>
                    </div>
                </div>
                <div className="flex justify-center gap-8 mt-10">
                    <CancelButton isSubmitting={isSubmitting} ><ReloadOutlined/> Cancel</CancelButton>
                    <SubmitButton isSubmitting={isSubmitting} classes="bg-teal-700! text-white!  h-10!"><SendOutlined/> Submit</SubmitButton>
                </div>
            </div>
        </form>
        </>
    )
}

export default BrandForm;