import { useState } from "react";

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Record<string, string[]>>({
        user1: ["Hello, I need help with my order."],
        user2: ["Can you assist me with a refund?"],
    });

    const users = [
        { id: "user1", name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: "user2", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=2" },
    ];

    const handleSendMessage = () => {
        if (selectedUser && message.trim()) {
            setMessages((prev) => ({
                ...prev,
                [selectedUser]: [...(prev[selectedUser] || []), `Admin: ${message}`],
            }));
            setMessage("");
        }
    };

    return (
        <div className="flex h-screen p-5 bg-gray-100">
            <div className="w-1/4 bg-white shadow-md rounded-lg p-4 mr-5">
                <h4 className="text-lg font-semibold mb-4">Users</h4>
                <ul>
                    {users.map((user) => (
                        <li
                            key={user.id}
                            onClick={() => setSelectedUser(user.id)}
                            className={`flex items-center p-2 rounded-lg cursor-pointer ${
                                selectedUser === user.id ? "bg-gray-200" : "hover:bg-gray-100"
                            }`}
                        >
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <span className="font-medium">{user.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 bg-white shadow-md rounded-lg p-4">
                {selectedUser ? (
                    <>
                        <h4 className="text-lg font-semibold mb-4">
                            Chat with {users.find((user) => user.id === selectedUser)?.name}
                        </h4>
                        <div className="h-3/5 overflow-y-auto border border-gray-200 p-3 mb-4 rounded-lg">
                            {messages[selectedUser]?.map((msg, index) => (
                                <div key={index} className="mb-2">
                                    <b>{msg.startsWith("Admin:") ? "Admin" : "User"}:</b> {msg}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <textarea
                                rows={2}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message here..."
                                className="flex-1 border border-gray-300 rounded-lg p-2"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <h5 className="text-md font-medium">Select a user to start chatting</h5>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
