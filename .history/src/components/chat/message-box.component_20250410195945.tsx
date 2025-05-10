import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../config/store";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { getUserDetail, UserQueryType } from "../../reducers/user.reducer";

const MessageBox = () =>{
  // const {name,image} = useSelector((root:RootState) =>{
  //   return {
  //     name:root.user.userDetail?.name,
  //     image:root.user.userDetail?.image.optimizedUrl
  //   }
  // })

  const [query,_setQuery] = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() =>{
    if(query.get("user")){ //user exists, it logs the value to the console.in this case user id
      // console.log(query.get("user"))
      dispatch(getUserDetail({id:query.get("user") as string}))
    }
  },[query])

  const userDetail = useSelector((root:RootState) =>{
    return root?.user?.userDetail 
  })

  const [message,setMessage] = useState<any>([])
  console.log(userDetail)
    return(
        <>
        <div className="p-4 border-b border-gray-200">
            <h1 className="text-lg font-bold text-center text-blue-600 flex items-center justify-center gap-2">
              User
            </h1> 
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
           {message && message.length > 0 ? (
            <>
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
            </>
           ) : (
            <>
              <div className="flex text">
              <p>Click user to send and receive message</p>
              </div>
            </>
           )}
        </div>
        </>
    )
}

export default MessageBox;