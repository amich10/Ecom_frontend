import { Content } from "antd/es/layout/layout";

const ChatPage = () => {
    return (
        <>
        <Content>
            <div className="flex w-full h-full p-2">
            {/* Sidebar for admin controls */}
            <div className="w-1/4 h-full bg-blue-500 p-4">
                <h2 className="text-white text-lg font-bold">Admin Controls</h2>
                <ul className="mt-4 text-white">
                <li className="mb-2 cursor-pointer">User Management</li>
                <li className="mb-2 cursor-pointer">Chat Settings</li>
                <li className="mb-2 cursor-pointer">Reports</li>
                </ul>
            </div>
            {/* Chat area */}
            <div className="w-3/4 h-full bg-yellow-300 p-4">
                <h2 className="text-black text-lg font-bold">Chat Area</h2>
                <div className="h-4/5 bg-white rounded shadow p-4 overflow-y-auto">
                {/* Chat messages */}
                <div className="mb-2">
                    <p className="text-gray-700"><strong>User1:</strong> Hello!</p>
                </div>
                <div className="mb-2">
                    <p className="text-gray-700"><strong>Admin:</strong> Hi, how can I help you?</p>
                </div>
                </div>
                {/* Input area */}
                <div className="mt-4 flex">
                <input
                    type="text"
                    className="flex-grow p-2 border rounded-l"
                    placeholder="Type a message..."
                />
                <button className="bg-blue-500 text-white px-4 rounded-r">Send</button>
                </div>
            </div>
            </div>
        </Content>
        </>
    )    
};

export default ChatPage;
