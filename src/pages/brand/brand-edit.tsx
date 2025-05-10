import { PlusOutlined } from "@ant-design/icons";
import { Layout,Typography,Input, Spin } from "antd";
import BrandForm,  {IBrandData} from "./brand-form.component";
import brandSvc from "../../services/brand.service";
import { NotificationType, notifyUserRegistration } from "../../utilities/helpers";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const brandEdit = () =>{
    const navigate = useNavigate()
    const [loading,setLoading] = useState<boolean>(true)
    const [brandData,setbrandData] = useState<any>()
    const params = useParams() //accesing data through parameter

    const editbrand = async (data: IBrandData): Promise<void> => {
        //console.log(data)
        try {
            await brandSvc.patchRequest('/brand/'+params.id,data,{file:true})
            notifyUserRegistration("brand edited sucessfully",NotificationType.SUCCESS)
            navigate('/admin/brand')
        } catch (exception) {
            console.log(exception)
            notifyUserRegistration("brand cannot be edited at this time",NotificationType.ERROR)
        }
    }

    const brandDetailById = async() =>{
        try {
            const {result} = await brandSvc.getRequest('/brand/'+params.id);
            console.log("brand Detail :",result)
            setbrandData(result.data)
        } catch (exception) {
            notifyUserRegistration("brand detail cannot be accessed now",NotificationType.ERROR)
            navigate('/admin/brand')
        }finally{
            setLoading(false)
        }
    }

    useEffect(() =>{
        brandDetailById()
    },[])

    return(
        <>
        
         <>
        <Layout.Content className=" rounded-md p-5">
        <div className=" border-b border-b-gray-500">
            <Typography.Title className="text-center text-white! bg-violet-600 text-3xl p-2 rounded-md "> <PlusOutlined/> Edit brand</Typography.Title>
        </div>
        <div className="mt-3">
           {loading ? <Spin fullscreen></Spin> : <BrandForm submitEvent={editbrand} brand={brandData}/>}
        </div>
        </Layout.Content>
        </>
        </>
    )
}

export default brandEdit;