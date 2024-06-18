import React from "react";
import { Form, Input, DatePicker, InputNumber, Button } from "antd";
import { usePostDatPhong } from "../../../../hooks/api/quanLyDatPhongApi/usePostDatPhong";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../constant";
import moment from "moment";

export const AddRoomBooking = () => {
  const [form] = Form.useForm();
  const mutation = usePostDatPhong();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const payload = {
      ...values,
      ngayDen: values.ngayDen.format("YYYY-MM-DD"),
      ngayDi: values.ngayDi.format("YYYY-MM-DD"),
    };
    mutation.mutate(payload, {
      onSuccess: () => {
        navigate(PATH.quanlydatphong);
      },
    });
  };

  return (
    <Form
      form={form}
      name="add_room_booking"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{
        maPhong: "",
        maNguoiDung: "",
        ngayDen: moment(),
        ngayDi: moment().add(1, 'days'),
        soLuongKhach: 1,
      }}
    >
      <Form.Item
        name="maPhong"
        label="Mã Phòng"
        rules={[{ required: true, message: "Please input the room code!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="maNguoiDung"
        label="Mã Người Dùng"
        rules={[{ required: true, message: "Please input the user code!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="ngayDen"
        label="Ngày Đến"
        rules={[{ required: true, message: "Please select the arrival date!" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="ngayDi"
        label="Ngày Đi"
        rules={[{ required: true, message: "Please select the departure date!" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="soLuongKhach"
        label="Số Lượng Khách"
        rules={[{ required: true, message: "Please input the number of guests!" }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Thêm đặt phòng</Button>
      </Form.Item>
    </Form>
  );
};
