import { PlusOutlined } from "@ant-design/icons";
import { Layout,Typography,Input } from "antd";
import CategoryForm, {ICategoryData} from "./category-form.component";
import categorySvc from "../../services/category.service";
import { NotificationType, notifyUserRegistration } from "../../utilities/helpers";
import { useNavigate } from "react-router";

const CategoryCreate = () =>{
    const navigate = useNavigate()

    const createCategory = async (data: ICategoryData): Promise<void> => {
        try {
            await categorySvc.postRequest('/category',data,{file:true})
            notifyUserRegistration("Category created sucessfully",NotificationType.SUCCESS)
            navigate('/admin/category')
        } catch (exception) {
            console.log(exception)
            notifyUserRegistration("Category cannot be created at this time",NotificationType.ERROR)
        }
    }

    return(
        <>
        
         <>
        <Layout.Content className=" rounded-md p-5">
        <div className=" border-b border-b-gray-500">
            <Typography.Title className="text-center text-white! bg-teal-600 text-3xl p-2 rounded-md "> <PlusOutlined/> Create New Category</Typography.Title>
        </div>
        <div className="mt-3">
            <CategoryForm submitEvent={createCategory}/>
        
        </div>
        </Layout.Content>
        </>
        </>
    )
}

export default CategoryCreate;