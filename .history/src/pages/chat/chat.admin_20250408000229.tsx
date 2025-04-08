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
                <div className="flex gap-2 p-2 bg">
                    <img src="https://placehold.co/50x50" alt="" className="rounded-full"/>
                    <div>
                        <h1>Amich Budha Magar</h1>
                        <p>This is a text from Amich Budha Magar</p>
                    </div>
                </div>
               </div>
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
