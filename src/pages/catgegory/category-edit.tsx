import { PlusOutlined } from "@ant-design/icons";
import { Layout,Typography,Input, Spin } from "antd";
import CategoryForm,  {ICategoryData} from "./category-form.component";
import categorySvc from "../../services/category.service";
import { NotificationType, notifyUserRegistration } from "../../utilities/helpers";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const categoryEdit = () =>{
    const navigate = useNavigate()
    const [loading,setLoading] = useState<boolean>(true)
    const [categoryData,setcategoryData] = useState<any>()
    const params = useParams() //accesing data through parameter

    const editcategory = async (data: ICategoryData): Promise<void> => {
        //console.log(data)
        try {
            await categorySvc.patchRequest('/category/'+params.id,data,{file:true})
            notifyUserRegistration("category edited sucessfully",NotificationType.SUCCESS)
            navigate('/admin/category')
        } catch (exception) {
            console.log(exception)
            notifyUserRegistration("category cannot be edited at this time",NotificationType.ERROR)
        }
    }

    const categoryDetailById = async() =>{
        try {
            const {result} = await categorySvc.getRequest('/category/'+params.id);
            console.log("category Detail :",result)
            setcategoryData(result.data)
        } catch (exception) {
            notifyUserRegistration("category detail cannot be accessed now",NotificationType.ERROR)
            navigate('/admin/category')
        }finally{
            setLoading(false)
        }
    }

    useEffect(() =>{
        categoryDetailById()
    },[])

    return(
        <>
        
         <>
        <Layout.Content className=" rounded-md p-5">
        <div className=" border-b border-b-gray-500">
            <Typography.Title className="text-center text-white! bg-violet-600 text-3xl p-2 rounded-md "> <PlusOutlined/> Edit category</Typography.Title>
        </div>
        <div className="mt-3">
           {loading ? <Spin fullscreen></Spin> : <CategoryForm submitEvent={editcategory} category={categoryData}/>}
        </div>
        </Layout.Content>
        </>
        </>
    )
}

export default categoryEdit;