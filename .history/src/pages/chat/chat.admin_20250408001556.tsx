import { MessageOutlined, UserOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { Input, Button } from "antd";

const ChatPage = () => {
    return (
        <>
        <Content>
            <div className="flex w-full h-full p-2">
            <div className="w-1/4 h-full border-2 border-gray-300 rounded-md shadow-md bg-white">
                {/* Left content */}
                <div className="p-4">
                    <h1 className="text-lg font-bold text-center mb-4 text-blue-600">
                        <UserOutlined /> Users
                    </h1>
                    <Input.Search 
                        placeholder="Search for users..." 
                        enterButton 
                        className="mb-2"
                    />
                </div>
                <div className="overflow-y-auto h-[calc(100%-120px)] flex gap-3 p-2">
                    <img src="https://placehold.co/50x50" alt="User Avatar" className="rounded-full w-10 h-10"/>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-blue-600 text-sm">User 1</h1>
                        <p className="text-xs text-gray-500 italic">This is a message preview from User 1</p>
                    </div>                 
                </div>
                
            </div>
            <div className="w-3/4 h-full p-2 rounded-md border-2 border-gray-300 shadow-md bg-white">
                {/* Right content */}
                <h1 className="text-center text-lg font-bold p-2"><MessageOutlined /> Chats</h1>
                <div className="flex flex-col h-full">
                    {/* Chat messages */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="mb-4">
                            <div className="bg-blue-100 p-2 rounded-md w-fit max-w-xs">
                                <p className="text-sm">Hello! How can I help you?</p>
                            </div>
                            <span className="text-xs text-gray-500">10:00 AM</span>
                        </div>
                        <div className="mb-4 text-right">
                            <div className="bg-green-100 p-2 rounded-md w-fit max-w-xs ml-auto">
                                <p className="text-sm">I need assistance with my order.</p>
                            </div>
                            <span className="text-xs text-gray-500">10:02 AM</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </Content>
        </>
    )    
};

export default ChatPage;
