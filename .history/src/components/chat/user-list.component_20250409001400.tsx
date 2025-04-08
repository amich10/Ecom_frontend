import { Input } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../config/store";
import { sayHello } from "../../reducers/user.reducer";

const UserList = () =>{
    // const dispatch = useDispatch<AppDispatch>()
  
    // setTimeout(() =>{
    //   dispatch(sayHello("Hello from the payload"))
    // },5000)


    const userList = useSelector((root:RootState) =>{
        return root?.user?.userList
    })

    console.log("User List:",userList)
  
    return (
        <>
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
           {userList ? (
            userList.map((user:any,index:))
           ) : <></>}
          </div>
        </div>
        </>
    )
}
export default UserList;