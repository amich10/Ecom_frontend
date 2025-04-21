import { Button,Input, message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../config/store";
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axios.config";
import { TextInputComponentController } from "../form/input.component";

const SendMessage = () =>{
  const {contorl,handleSubmit,formState:{errors,isSubmitting}} = useForm({
    defaultValues:{
      message:""
    }
  })

    //fetching userDetail value from reducer(slice)
  const userDetail = useSelector((root:RootState) =>{
    // console.log(root) //"userDetail": "Hello from the payload"

  })

  const sendMessageHandler = (data:{message:string}) =>{
    try {
      console.log(data)
    } catch (exception) {
      console.log(exception)
    }
  }
    return(
        <>
          {/* Input */}
          <form onSubmit={handleSubmit(sendMessageHandler)}></form>
          <div className="p-4 border-t border-gray-300">
            <div className="flex items-center gap-2">
            <TextInputComponentController control={contorl} errorMsg={errors?.message?.message} name="message"/>

            </div>
          </div>
        </>
    )
}

export default SendMessage;