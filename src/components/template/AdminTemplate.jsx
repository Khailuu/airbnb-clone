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
import { NavLink } from "react-router-dom";
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
      <Sider
        collapsible collapsed={collapsed} onCollapse={setCollapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
          <Menu.Item icon={<UserOutlined />}>
            <NavLink to={PATH.dashboard}>Quản lý người dùng</NavLink>
          </Menu.Item>
          <Menu.Item>
              <NavLink>Quản lý thông tin vị trí</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink>Quản lý thông tin phòng</NavLink>
            </Menu.Item>
          {/* <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
            
          </SubMenu> */}
          <Menu.Item icon={<DesktopOutlined />}>
            <NavLink>Quản lý đặt phòng</NavLink>
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
            Bill is a cat.
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
