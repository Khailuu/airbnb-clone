import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { quanLyNguoiDungServices } from '../../../services/QuanLyNguoiDungService'
import { quanLyUserServices } from '../../../services/QuanLyUser'
import { useFormik } from 'formik'
import { Button, DatePicker, Form, Input, Radio } from 'antd'
import { LOCAL_USER_LOGIN_KEY, PATH } from '../../../constant'
import moment from 'moment'
import { useEditNguoiDung } from '../../../hooks/api/quanLyNguoiDungApi/useEditNguoiDung'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { quanLyNguoiDungAction } from '../../../store/quanLyNguoiDung/slice'

export const EditProfile = () => {

  const { id } = useParams()
  const parseId = parseInt(id)
  const [ user, setUser ] = useState(null) 
  const mutation = useEditNguoiDung()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.quanLyNguoiDung)
  useEffect(() => {
    quanLyUserServices.getNguoiDungTheoId(parseId).then((res) => {
      setUser(res.data?.content)
    })
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user?.id || 0,
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      birthday: user?.birthday || '',
      gender: user?.gender || true,
      role: user?.role || '',
      avatar: user?.avatar || "",
      password: user?.password || "",
    },
    onSubmit: values => {
      mutation.mutate({ id: user?.id, payload: values }, {
        onSuccess: () => {
          dispatch(quanLyNguoiDungAction.updateUserLogin({
            ...userLogin,
            user: values
          })) 
          // localStorage.setItem(LOCAL_USER_LOGIN_KEY, JSON.stringify(values))
          toast.success("Cập nhật thông tin thành công!")
        },
        onError: (err) => {
          toast.error(err)
        }
      });
    }
  });


  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };


  return (
    <div className='container mx-auto my-[40px]'>
          <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{ maxWidth: 600 }}
      onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Id">
        <Input name="id" disabled value={formik.values.id} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Name">
        <Input name="name" value={formik.values.name} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Email">
        <Input name="email" value={formik.values.email} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Phone">
        <Input name="phone" value={formik.values.phone} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Birthday">
        <DatePicker 
          name="birthday" 
          value={moment(formik.values.birthday, 'DD-MM-YYYY')} 
          format='DD-MM-YYYY'
          onChange={(date) => formik.setFieldValue('birthday', date)} 
        />
      </Form.Item>
      <Form.Item label="Gender">
        <Radio.Group name="gender" value={formik.values.gender} onChange={formik.handleChange}>
          <Radio value={true}>Male</Radio>
          <Radio value={false}>Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Role">
        <Input name="role" value={formik.values.role.toUpperCase()} onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Cập Nhật</Button>
      </Form.Item>
    </Form>
    </div>
  )
}
