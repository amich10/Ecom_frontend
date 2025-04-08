import { MessageOutlined, UserOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { Input } from "antd";

const ChatPage = () => {
    return (
        <>
        <Content>
            <div className="flex w-full h-full p-2">
            <div className="w-1/4 h-full border-2 border-blue-400 rounded-md">
                {/* Left content */}
               <div className="p-2">
               <h1 className="text-lg font-bold text-center p-2 text-blue-600">
                    <UserOutlined /> Users
                </h1>
                <Input.Search placeholder="Search for users ..." enterButton></Input.Search>
               </div>
               <div>
                   <div className="flex items-center justify-between p-2 border-b">
                       <div className="flex items-center"></div>
            </div>
            <div className="w-3/4 h-full p-2 rounded-md">
                {/* Right content */}
                <h1 className="text-center text-lg font-bold p-2"><MessageOutlined /> Chats</h1>
            </div>
            </div>
        </Content>
        </>
    )    
};

export default ChatPage;
