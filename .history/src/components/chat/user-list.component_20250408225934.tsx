import {In}

const UserList = () =>{
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
        </>
    )
}
export default UserList;