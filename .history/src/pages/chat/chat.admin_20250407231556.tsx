import { Content } from "antd/es/layout/layout";

const ChatPage = () =>{
    return (
        <>
        <Content>
            const { Title } = Typography;
            const { TextArea } = Input;

            const ChatPage = () => {
                const [selectedUser, setSelectedUser] = useState(null);
                const [message, setMessage] = useState("");
                const [messages, setMessages] = useState({
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
                    <div style={{ display: "flex", height: "100vh", padding: "20px" }}>
                        <Card style={{ width: "25%", marginRight: "20px" }}>
                            <Title level={4}>Users</Title>
                            <List
                                itemLayout="horizontal"
                                dataSource={users}
                                renderItem={(user) => (
                                    <List.Item
                                        onClick={() => setSelectedUser(user.id)}
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: selectedUser === user.id ? "#f0f0f0" : "transparent",
                                        }}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={user.avatar} />}
                                            title={user.name}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                        <Card style={{ flex: 1 }}>
                            {selectedUser ? (
                                <>
                                    <Title level={4}>
                                        Chat with {users.find((user) => user.id === selectedUser)?.name}
                                    </Title>
                                    <div
                                        style={{
                                            height: "60vh",
                                            overflowY: "auto",
                                            border: "1px solid #f0f0f0",
                                            padding: "10px",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        {messages[selectedUser]?.map((msg, index) => (
                                            <div key={index} style={{ marginBottom: "10px" }}>
                                                <b>{msg.startsWith("Admin:") ? "Admin" : "User"}:</b> {msg}
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <TextArea
                                            rows={2}
                                            value={message}
        </Content>
        </>
    )
}
export default ChatPage;