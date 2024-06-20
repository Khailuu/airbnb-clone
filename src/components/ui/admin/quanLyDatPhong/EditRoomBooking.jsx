import React, { useEffect } from "react";
import { Form, Input, DatePicker, InputNumber, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateDatPhong } from "../../../../hooks/api/quanLyDatPhongApi/useUpdateDatPhong";
import { useGetDatPhong } from "../../../../hooks/api/quanLyDatPhongApi/useGetDatPhong";
import moment from "moment";
import { PATH } from "../../../../constant";

export const EditRoomBooking = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const mutationUpdate = useUpdateDatPhong();
  const { data: bookings, refetch } = useGetDatPhong();

  useEffect(() => {
    if (bookings) {
      const booking = bookings.find((b) => b.id === parseInt(id));
      if (booking) {
        form.setFieldsValue({
          ...booking,
          ngayDen: moment(booking.ngayDen),
          ngayDi: moment(booking.ngayDi),
        });
      }
    }
  }, [bookings, id, form]);

  const onFinish = (values) => {
    const payload = {
      ...values,
      ngayDen: values.ngayDen.format("YYYY-MM-DD"),
      ngayDi: values.ngayDi.format("YYYY-MM-DD"),
    };
    mutationUpdate.mutate({ id, payload }, {
      onSuccess: () => {
        refetch();
        navigate(PATH.quanlydatphong);
      },
    });
  };

  return (
    <Form
      form={form}
      name="edit_room_booking"
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
        <Button type="primary" htmlType="submit">
          Cập Nhật
        </Button>
      </Form.Item>
    </Form>
  );
};
