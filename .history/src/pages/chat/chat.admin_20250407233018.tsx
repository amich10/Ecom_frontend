import { Content } from "antd/es/layout/layout";

const ChatPage = () => {
    return (
        <>
        <Content>
            <div className="flex w-full">
            <div className="w-1/4 bg-gray-200">
                {/* Left content */}
            </div>
            <div className="w-3/4 bg-white">
                {/* Right content */}
            </div>
            </div>
        </Content>
        </>
    )    
};

export default ChatPage;
