import { Layout, Button, Dropdown, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  KeyOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { NavLink, useNavigate } from "react-router";
import { PiUserListLight } from "react-icons/pi";
import { removeLocalStorage } from "../../utilities/helpers";
import { WebStorageConstant } from "../../config/constats";
import { ILoggedInUserData, useAuth } from "../../context/auth.context";

const { Header } = Layout;
export const AdminHeader = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: Function;
}) => {
  const navigate = useNavigate();
  const { setLoggedInUser } = useAuth();

  const menuItems: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <NavLink to="/profile">
          <UserOutlined className="mr-1.5" />
          Profile Update
        </NavLink>
      ),
    },
    {
      key: 2,
      label: (
        <NavLink to="/change-password">
          <KeyOutlined className="mr-1.5" />
          Change Password
        </NavLink>
      ),
    },
    {
      key: 3,
      label: (
        <NavLink
          to="/"
          onClick={(event) => {
            event.preventDefault();
            removeLocalStorage(WebStorageConstant.ACCESS_TOKEN);
            removeLocalStorage(WebStorageConstant.REFRESH_TOKEN);
            setLoggedInUser({} as ILoggedInUserData);
            navigate("/");
          }}
        >
          <LogoutOutlined className="mr-1.5" />
          Logout
        </NavLink>
      ),
    },
  ];
  return (
    <>
      <Header className=" p-0! bg-white! flex justify-between">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />

      </Header>
    </>
  );
};
