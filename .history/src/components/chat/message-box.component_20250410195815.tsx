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
           {message && message.length > 0 : <></>}
        </div>
        </>
    )
}

export default MessageBox;