import { PlusOutlined } from "@ant-design/icons";
import { Layout,Typography,Input } from "antd";
import BrandForm, {IBrandData} from "./brand-form.component";
import brandSvc from "../../services/brand.service";
import { NotificationType, notifyUserRegistration } from "../../utilities/helpers";
import { useNavigate } from "react-router";

const BrandCreate = () =>{
    const navigate = useNavigate()

    const createBrand = async (data: IBrandData): Promise<void> => {
        try {
            await brandSvc.postRequest('/brand',data,{file:true})
            notifyUserRegistration("Brand created sucessfully",NotificationType.SUCCESS)
            navigate('/admin/brand')
        } catch (exception) {
            console.log(exception)
            notifyUserRegistration("Brand cannot be created at this time",NotificationType.ERROR)
        }
    }

    return(
        <>
        
         <>
        <Layout.Content className=" rounded-md p-5">
        <div className=" border-b border-b-gray-500">
            <Typography.Title className="text-center text-white! bg-teal-600 text-3xl p-2 rounded-md "> <PlusOutlined/> Create New Brand</Typography.Title>
        </div>
        <div className="mt-3">
            <BrandForm submitEvent={createBrand}/>
        
        </div>
        </Layout.Content>
        </>
        </>
    )
}

export default BrandCreate;