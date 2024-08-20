import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  CarFilled,
  HomeFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { LOCAL_USER_LOGIN_KEY, PATH } from "../../constant";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { quanLyNguoiDungAction } from "../../store/quanLyNguoiDung/slice";
const { Header, Footer, Sider } = Layout;

export const AdminTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.quanLyNguoiDung);
  if (!userLogin) {
    navigate(PATH.login);
  }
  if (userLogin) {
    if (userLogin?.user.role === "USER") {
      navigate(PATH.home);
    }
  }
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
  const handleDangXuat = () => {
    localStorage.removeItem(LOCAL_USER_LOGIN_KEY);
    dispatch(quanLyNguoiDungAction.updateUserLogin(null));
    navigate(PATH.login);
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
          <NavLink to="/">
            <img
              src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
              className="my-[20px] p-1"
            />
          </NavLink>
          <Menu.Item key={5} icon={<UserOutlined />}>
            <NavLink key={1} to={PATH.quanlynguoidung}>
              Quản lý người dùng
            </NavLink>
          </Menu.Item>
          <Menu.Item key={6} icon={<CarFilled />}>
            <NavLink key={2} to={PATH.quanlythongtinvitri}>
              Quản lý thông tin vị trí
            </NavLink>
          </Menu.Item>
          <Menu.Item key={7} icon={<HomeFilled />}>
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
            background: colorBgContainer,
          }}
        >
          <div className="container text-right">
            <Button
              className="ms-auto"
              onClick={() => {
                handleDangXuat();
              }}
            >
              Đăng xuất
            </Button>
          </div>
        </Header>
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
