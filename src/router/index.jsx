import { useRoutes } from "react-router-dom";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { PATH } from "../constant";
import { Home, Login, Register } from "../pages";
import { HomeLayout } from "../components/layouts/HomeLayout";
import { Room } from "../pages/Room";
import { RoomList } from "../components/ui/roomList/RoomList";
import { RoomDetail } from "../components/ui/Detail/RoomDetail";
import { Details } from "../pages/Details";
import { AdminLayout } from "../components/layouts/AdminLayout";
import { Payment } from "../pages/Payment";
import User from "../pages/User";
import {
  QuanLyDatPhong,
  QuanLyNguoiDung,
  QuanLyThongTinPhong,
  QuanLyThongTinViTri,
} from "../components/ui/admin";
import { EditNguoiDung } from "../components/ui/admin/quanLyNguoiDung/EditNguoiDung";
import { ThemViTri } from "../components/ui/admin/quanLyThonTinViTri/ThemViTri";
import { EditViTri } from "../components/ui/admin/quanLyThonTinViTri/EditViTri";
import { Admin } from "../pages/Admin";
import { ThemPhong } from "../components/ui/admin/quanLyThongTInPhong/ThemPhong";
import { EditProfile } from "../components/ui/User/EditProfile";
import { AddNguoiDung } from "../components/ui/admin/quanLyNguoiDung/AddNguoiDung";
import { EditPhong } from "../components/ui/admin/quanLyThongTInPhong/EditPhong";
import { PaymentComfirm } from "../components/ui/pyment/PaymentComfirm";
const router = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: PATH.login,
        element: <Login />,
      },
      {
        path: PATH.register,
        element: <Register />,
      },
    ],
  },
  {
    
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: PATH.roomlist,
        element: <Room />,
        children: [
          {
            path: `${PATH.roomlist}/:id`,
            element: <RoomList />,
          },
        ],
      },
      {
        path: PATH.details,
        element: <Details />,
        children: [
          {
            path: `${PATH.details}/:id`,
            element: <RoomDetail />,
          },
        ],
      },
      {
        path: PATH.payment,
        element: <Payment />,
      },
      {
        path: PATH.user,
        element: <User />,
      },
      {
        path: `${PATH.editprofile}/:id`,
        element: <EditProfile />
      },
      {
        path: PATH.paymentConfirm, // Đường dẫn cho PaymentConfirmation
        element: <PaymentComfirm />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: PATH.admin,
        element: <Admin />,
      },
      {
        path: PATH.quanlydatphong,
        element: <QuanLyDatPhong />,
      },
      {
        path: PATH.quanlynguoidung,
        element: <QuanLyNguoiDung />,
      },
      {
        path: PATH.themnguoidung,
        element: <AddNguoiDung />,
      },
      {
        path: PATH.quanlythongtinphong,
        element: <QuanLyThongTinPhong />,
      },

      {
        path: `${PATH.editphong}/:id`,
        element: <EditPhong />,
      },
      {
        path: PATH.themphong,
        element: <ThemPhong />,
      },
      {
        path: PATH.quanlythongtinvitri,
        element: <QuanLyThongTinViTri />,
      },
      {
        path: `${PATH.editNguoiDung}/:id`,
        element: <EditNguoiDung />,
      },
      {
        path: PATH.themvitri,
        element: <ThemViTri />,
      },
      {
        path: `${PATH.editvitri}/:id`,
        element: <EditViTri />,
      },
    ],
  },
];
export const Router = () => useRoutes(router);
