import { Content } from "antd/es/layout/layout";

const ChatPage = () => {
    return (
        <>
        <Content>
        <div style={{ display: "flex", height: "100%" }}>
            <div className="w-1/4 bg-green-300 h-full"></div>
            <div className="w-3/4 bg-gray-300 h-full"></div>
        </div>
        </Content>
        </>
    )    
};

export default ChatPage;
