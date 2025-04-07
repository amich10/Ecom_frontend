import React, { useState } from 'react';
import { Layout } from 'antd';
import { AdminHeader } from '../../components/header/admin-header.component';
import { AdminSideBar } from '../../components/sidebar/admin-sidebar.component';
import { Outlet } from 'react-router';



const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      
      <AdminSideBar collapsed={collapsed}/>

      <Layout>

        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Outlet/>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;