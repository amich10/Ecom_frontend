import { Content } from "antd/es/layout/layout";
import SendMessage from "../../components/chat/send-message.component";
import UserList from "../../components/chat/user-list.component";
import MessageBox from "../../components/chat/message-box.component";
import { useDispatch } from "react-redux";

const ChatPage = () => {

  const dispatch= useDispatch()

  return (
    <Content className="h-[calc(100vh-64px)] p-2">
      <div className="flex w-full h-full gap-2">
        {/* Sidebar */}
        <UserList/>

        {/* Chat Area */}
        <div className="w-3/4 flex flex-col border border-gray-300 rounded-md shadow-md bg-white">
          <MessageBox/>
          <SendMessage/>
        </div>
      </div>
    </Content>
  );
};

export default ChatPage;
