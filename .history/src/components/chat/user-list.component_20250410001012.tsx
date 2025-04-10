import { Input } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../config/store";
import { setActiveUser } from "../../reducers/user.reducer";
import { ILoggedInUserData } from "../../context/auth.context";
import { useSearchParams } from "react-router";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userList: Array<any> = useSelector((root: RootState) => root.user.userList || []);
  // console.log("User List:", userList);

  const currentUser = useSelector((root:RootState) =>{ //when specific user is clicked
    return root.user.userDetail as ILoggedInUserData | null
  })
  console.log("clicked user :",currentUser)

  const [query,setQuery]=useSearchParams()

  return (
    <div className="w-1/4 flex flex-col border border-gray-300 rounded-md shadow-md bg-white">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-bold text-center mb-4 text-blue-600 flex items-center justify-center gap-2">
          <MessageOutlined /> Chats
        </h1>
        <Input.Search placeholder="Search for users..." enterButton className="mb-2" />
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {userList.length > 0 ? (
          userList.map((user: any, index: number) => (
            <div
              key={user._id || index}
              className={`flex gap-3 items-start p-2 rounded-md hover:bg-gray-200 transition hover:cursor-pointer`} // ${currentUser && currentUser._id === user._id} ? bg-blue-400:""
              onClick={() =>{
                setQuery({
                  user:user._id  //if username existr set usernam
                })
                dispatch(setActiveUser(user))}}
            >
              <img
                src={user?.image.optimizedUrl || "https://placehold.co/50x50"}
                alt="User Avatar"
                className="rounded-full w-10 h-10"
              />
              <div className="flex flex-col">
                <h1 className="font-bold text-blue-600 text-sm">{user?.name || "Unnamed User"}</h1>
                <p className="text-xs text-gray-500 italic">
                  {user?.email || "No message preview"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic text-center">No users found</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
