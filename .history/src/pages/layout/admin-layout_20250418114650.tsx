import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { AdminHeader } from "../../components/header/admin-header.component";
import { AdminSideBar } from "../../components/sidebar/admin-sidebar.component";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../context/auth.context";

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/");
    }
  }, []);
  return (
    <Layout>
      <AdminSideBar collapsed={collapsed} />
      <Layout>
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        {/* Outlet renders the nested route components */}
        <Layout.Content>
          <Outlet /> {/* This will render components like ChangePasswordPage */}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
};

export default AdminLayout;
