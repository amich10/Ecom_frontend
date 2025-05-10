import { Content } from "antd/es/layout/layout";

const ChatPage = () => {
    return (
        <>
        <Content>
            <div className="flex w-full h-full m-l-2">
            <div className="w-1/4 h-full bg-blue-500">
                {/* Left content */}
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
