import { Content } from "antd/es/layout/layout";
import SendMessage from "../../components/chat/send-message.component";
import UserList from "../../components/chat/user-list.component";
import MessageBox from "../../components/chat/message-box.component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../config/store";
import { useEffect } from "react";
import { getAllUsers } from "../../reducers/user.reducer";

const ChatPage = () => {

  const dispatch= useDispatch<AppDispatch>()

  useEffect(() =>{
    dispatch(getAllUsers({
      page:1,
      limit:20,
      search:null
    }))
  },[])
  
const activeUser = useSelector((root:RootState) =>{
  return root.user.userDetail
})

  return (
    <Content className="h-[calc(100vh-64px)] p-2">
      <div className="flex w-full h-full gap-2">
        {/* Sidebar */}
        <UserList/>

        {/* Chat Area */}
        {activeUser ? <div className="w-3/4 flex flex-col border border-gray-300 rounded-md shadow-md bg-white">
          <MessageBox/>
          <SendMessage/>
        </div>: <>
      <div className="flex justify-center it">
      <p className="text-center underline font-bold text-blue-500">Click user to send and receive message</p>
      </div>
        </>}
      </div>
    </Content>
  );
};

export default ChatPage;
