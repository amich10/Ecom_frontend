import { MessageOutlined, UserOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../config/store";
import { sayHello } from "../../reducers/user.reducer";
import SendMessage from "../../components/chat/send-message.component";

const ChatPage = () => {

  const dispatch = useDispatch<AppDispatch>()
  
  setTimeout(() =>{
    dispatch(sayHello("Hello from the payload"))
  },5000)


  //fetching userDetail value from reducer(slice)
  const userDetail = useSelector((root:RootState) =>{
    console.log(root) //"userDetail": "Hello from the payload"

  })

  return (
    <Content className="h-[calc(100vh-64px)] p-2">
      <div className="flex w-full h-full gap-2">
        {/* Sidebar */}
        <

        {/* Chat Area */}
        <div className="w-3/4 flex flex-col border border-gray-300 rounded-md shadow-md bg-white">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-lg font-bold text-center text-blue-600 flex items-center justify-center gap-2">
            <UserOutlined /> User 1
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
          <SendMessage/>
        </div>
      </div>
    </Content>
  );
};

export default ChatPage;
