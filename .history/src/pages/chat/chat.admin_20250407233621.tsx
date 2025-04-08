import { MessageOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";

const ChatPage = () => {
    return (
        <>
        <Content>
            <div className="flex w-full h-full p-2">
            <div className="w-1/4 h-full bg-blue-500">
                {/* Left content */}
                <h1> <MessageOutlined /> Chats</h1>
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
