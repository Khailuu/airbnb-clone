import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyNguoiDungServices } from "../../services/QuanLyNguoiDungService";

export const loginThunk = createAsyncThunk('quanLyNguoiDung/login',
async (payload, {rejectWithValue}) => {
    try {
        const res = await quanLyNguoiDungServices.dangNhap(payload)
        return res.data
    } catch(err) {
        return rejectWithValue(err)
    }
})