import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../config/store";

const MessageBox = () =>{
  const user = useSelector((root:RootState) =>{
    return root.user.
  })
    return(
        <>
        <div className="p-4 border-b border-gray-200">
            <h1 className="text-lg font-bold text-center text-blue-600 flex items-center justify-center gap-2">
            <UserOutlined /> {}
            </h1>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <div className="bg-blue-100 p-2 rounded-md w-fit max-w-xs">
                <p className="text-sm">Hello! How can I help you?</p>
              </div>
              <span className="text-xs text-gray-500">10:00 AM</span>
            </div>
            <div className="text-right">
              <div className="bg-green-100 p-2 rounded-md w-fit max-w-xs ml-auto">
                <p className="text-sm">I need assistance with my order.</p>
              </div>
              <span className="text-xs text-gray-500">10:02 AM</span>
            </div>
        </div>
        </>
    )
}

export default MessageBox;