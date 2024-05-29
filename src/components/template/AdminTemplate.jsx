import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { PATH } from "../../constant";
import { NavLink, Outlet } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
const { Header, Content, Footer, Sider } = Layout;

export const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getSelectedKeys = (pathname) => {
    if (pathname.startsWith(PATH.admin)) {
      return [PATH.admin];
    }
    return [pathname];
  };

  const [selectedKeys, setSelectedKeys] = useState(
    getSelectedKeys(location.pathname)
  );

  useEffect(() => {
    setSelectedKeys(getSelectedKeys(location.pathname));
  }, [location.pathname]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
          <Menu.Item key={5} icon={<UserOutlined />}>
            <NavLink key={1} to={PATH.quanlynguoidung}>
              Quản lý người dùng
            </NavLink>
          </Menu.Item>
          <Menu.Item key={6}>
            <NavLink key={2} to={PATH.quanlythongtinvitri}>
              Quản lý thông tin vị trí
            </NavLink>
          </Menu.Item>
          <Menu.Item key={7}>
            <NavLink key={3} to={PATH.quanlythongtinphong}>
              Quản lý thông tin phòng
            </NavLink>
          </Menu.Item>
          {/* <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
            
          </SubMenu> */}
          <Menu.Item key={8} icon={<DesktopOutlined />}>
            <NavLink key={4} to={PATH.quanlydatphong}>
              Quản lý đặt phòng
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "16px",
            minHeight: "100%",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
