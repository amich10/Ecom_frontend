import { MessageOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { Input } from "antd";

const ChatPage = () => {
    return (
        <>
        <Content>
            <div className="flex w-full h-full p-2">
            <div className="w-1/4 h-full bg-blue-500">
                {/* Left content */}
               <div className="p-2">
               <h1 className="text-white text-lg font-bold text-center p-2 text">
                    <Users
                </h1>
                <Input.Search placeholder="Search for users ..." enterButton></Input.Search>
               </div>
               <div>

               </div>
                
            </div>
            <div className="w-3/4 h-full bg-yellow-300">
                {/* Right content */}

            </div>
            </div>
        </Content>
        </>
    )    
};

export default ChatPage;
