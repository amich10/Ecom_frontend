import { Input } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../config/store";

const UserList = () =>{
    // const dispatch = useDispatch<AppDispatch>()
  
    // setTimeout(() =>{
    //   dispatch(sayHello("Hello from the payload"))
    // },5000)


    const userList:Array<any> = useSelector((root:RootState) =>{
        return root?.user?.userList as any
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
            userList.map((user:any,index:number) =>{
            userList.map((user: any, index: number) => (
              <div key={index} className="flex gap-3 items-start">
                <img
                  src="https://placehold.co/50x50"
                  alt="User Avatar"
                  className="rounded-full w-10 h-10"
                />
                <div className="flex flex-col">
                  <h1 className="font-bold text-blue-600 text-sm">{user.name}</h1>
                  <p className="text-xs text-gray-500 italic">
                    {user.messagePreview}
                  </p>
                </div>
              </div>
            ))
          </div>
        </div>
        </>
    )
}
export default UserList;