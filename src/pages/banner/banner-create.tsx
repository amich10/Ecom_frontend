import { PlusOutlined } from "@ant-design/icons";
import { Layout,Typography,Input } from "antd";
import BannerForm, {IBannerData} from "./banner-form.component";
import bannerSvc from "../../services/banner.service";
import { NotificationType, notifyUserRegistration } from "../../utilities/helpers";
import { useNavigate } from "react-router";

const BannerCreate = () =>{
    const navigate = useNavigate()

    const createBanner = async (data: IBannerData): Promise<void> => {
        try {
            await bannerSvc.postRequest('/banner',data,{file:true})
            notifyUserRegistration("Banner created sucessfully",NotificationType.SUCCESS)
            navigate('/admin/banner')
        } catch (exception) {
            console.log(exception)
            notifyUserRegistration("Banner cannot be created at this time",NotificationType.ERROR)
        }
    }

    return(
        <>
        
         <>
        <Layout.Content className=" rounded-md p-5">
        <div className=" border-b border-b-gray-500">
            <Typography.Title className="text-center text-white! bg-teal-600 text-3xl p-2 rounded-md "> <PlusOutlined/> Create New Banner</Typography.Title>
        </div>
        <div className="mt-3">
            <BannerForm submitEvent={createBanner}/>
        
        </div>
        </Layout.Content>
        </>
        </>
    )
}

export default BannerCreate;