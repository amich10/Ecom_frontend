import { Button,Input } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../config/store";
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axios.config";

const SendMessage = () =>{
  const {contorl,handleSubmit,formState:{errors,isSubmitting}} = useForm()

    //fetching userDetail value from reducer(slice)
  const userDetail = useSelector((root:RootState) =>{
    // console.log(root) //"userDetail": "Hello from the payload"

  })

  const sendMessageHandler = async(data:string) =>{
    try {
      const response = await axiosInstance
    } catch (exception) {
      console.log(exception)
    }
  }
    return(
        <>
          {/* Input */}
          <form onSubmit={handleSubmit}></form>
          <div className="p-4 border-t border-gray-300">
            <div className="flex items-center gap-2">
              <Input.TextArea
                placeholder="Type a message..."
                className="flex-1 resize-none"
                autoSize={{ minRows: 1, maxRows: 4 }}
              />
              <Button type="primary">Send</Button>
            </div>
          </div>
        </>
    )
}

export default SendMessage;