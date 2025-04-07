import { PlusOutlined } from "@ant-design/icons";
import { Layout,Typography,Input, Spin } from "antd";
import BannerForm,  {IBannerData} from "./banner-form.component";
import bannerSvc from "../../services/banner.service";
import { NotificationType, notifyUserRegistration } from "../../utilities/helpers";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const bannerEdit = () =>{
    const navigate = useNavigate()
    const [loading,setLoading] = useState<boolean>(true)
    const [bannerData,setbannerData] = useState<any>()
    const params = useParams() //accesing data through parameter

    const editbanner = async (data: IBannerData): Promise<void> => {
        //console.log(data)
        try {
            await bannerSvc.patchRequest('/banner/'+params.id,data,{file:true})
            notifyUserRegistration("banner edited sucessfully",NotificationType.SUCCESS)
            navigate('/admin/banner')
        } catch (exception) {
            console.log(exception)
            notifyUserRegistration("banner cannot be edited at this time",NotificationType.ERROR)
        }
    }

    const bannerDetailById = async() =>{
        try {
            const {result} = await bannerSvc.getRequest('/banner/'+params.id);
            console.log("banner Detail :",result)
            setbannerData(result.data)
        } catch (exception) {
            notifyUserRegistration("banner detail cannot be accessed now",NotificationType.ERROR)
            navigate('/admin/banner')
        }finally{
            setLoading(false)
        }
    }

    useEffect(() =>{
        bannerDetailById()
    },[])

    return(
        <>
        
         <>
        <Layout.Content className=" rounded-md p-5">
        <div className=" border-b border-b-gray-500">
            <Typography.Title className="text-center text-white! bg-violet-600 text-3xl p-2 rounded-md "> <PlusOutlined/> Edit banner</Typography.Title>
        </div>
        <div className="mt-3">
           {loading ? <Spin fullscreen></Spin> : <BannerForm submitEvent={editbanner} banner={bannerData}/>}
        </div>
        </Layout.Content>
        </>
        </>
    )
}

export default bannerEdit;