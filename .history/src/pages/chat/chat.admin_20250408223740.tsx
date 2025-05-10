import { MessageOutlined, UserOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../config/store";
import { sayHello } from "../../reducers/user.reducer";

const ChatPage = () => {

  const dispatch = useDispatch<AppDispatch>()
  dispatch(sayHello("H"))

  return (
    <Content className="h-[calc(100vh-64px)] p-2">
      {/* Adjust outer height to fill viewport minus header */}
      <div className="flex w-full h-full gap-2">
        {/* Sidebar */}
        <div className="w-1/4 flex flex-col border border-gray-300 rounded-md shadow-md bg-white">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-lg font-bold text-center mb-4 text-blue-600 flex items-center justify-center gap-2">
              <MessageOutlined /> Chats
            </h1>
            <Input.Search
              placeholder="Search for users..."
              enterButton
              className="mb-2"
            />
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-4">
            <div className="flex gap-3 items-start">
              <img
                src="https://placehold.co/50x50"
                alt="User Avatar"
                className="rounded-full w-10 h-10"
              />
              <div className="flex flex-col">
                <h1 className="font-bold text-blue-600 text-sm">User 1</h1>
                <p className="text-xs text-gray-500 italic">
                  This is a message preview from User 1
                </p>
              </div>
            </div>
          </div>
        </div>

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

          {/* Input */}
          <div className="p-4 border-t border-gray-300">
            <div className="flex items-center gap-2">
              <Input.TextArea
                placeholder="Type a message..."
                className="flex-1 resize-none"
                autoSize={{ minRows: 1, maxRows: 4 }}
              />
              <Button type="primary">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default ChatPage;
