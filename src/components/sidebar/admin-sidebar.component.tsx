import { HomeOutlined,FileImageOutlined, BoldOutlined, ApartmentOutlined, UserOutlined, ShopOutlined, ShoppingCartOutlined, DollarCircleOutlined, MessageOutlined } from "@ant-design/icons";
import { Menu, Layout, Divider} from "antd";
import { NavLink } from "react-router";

const {Sider} = Layout;

export const AdminSideBar = ({collapsed}:{collapsed:boolean}) =>{;
    return (
        <>
         <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0}>
        <div className="demo-logo-vertical text-white flex flex-col justify-center items-center p-3 gap-3">
            <img src="https://placehold.co/60x60" alt="user Image" className="rounded-full w-15 h-15 border-2 border-teal-500 "/>
            <p>Amich Budha Magar</p>
        </div>
        <Divider className="bg-teal-500"/>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: <NavLink to="/admin">Dashboard</NavLink>
            },
            {
                key: '2',
                icon: <FileImageOutlined/>,
                label: <NavLink to="/admin/banner">Banner</NavLink>
              },
              {
                key: '3',
                icon: <BoldOutlined/>,
                label: <NavLink to="/admin/brand">Brand</NavLink>
              },
              {
                key: '4',
                icon: <ApartmentOutlined />,
                label: <NavLink to="/admin/category">Category</NavLink>
              },
              {
                key: '5',
                icon: <UserOutlined />,
                label: <NavLink to="/admin/users">Users</NavLink>
              },
              {
                key: '6',
                icon: <ShopOutlined />,
                label: <NavLink to="/admin/products">Products</NavLink>
              },
              {
                key: '7',
                icon: <ShoppingCartOutlined />,
                label: <NavLink to="/admin/orders">Orders</NavLink>
              },    
              {
                key: '8',
                icon: <DollarCircleOutlined />,
                label: <NavLink to="/admin/transactions">Transactions</NavLink>
              },
              {
                key: '9',
                icon: <MessageOutlined />,
                label: <NavLink to="/admin/messages">Messages</NavLink>
              },  

          ]}
        />
      </Sider>

        </>
    )
}