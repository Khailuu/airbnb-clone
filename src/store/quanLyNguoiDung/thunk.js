import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyNguoiDungServices } from "../../services/QuanLyNguoiDungService";
import { sleep } from "../../utils/sleep";

export const loginThunk = createAsyncThunk('quanLyNguoiDung/login',
async (payload, {rejectWithValue}) => {
    try {
        await sleep()
        const res = await quanLyNguoiDungServices.dangNhap(payload)
        return res.data
    } catch(err) {
        return rejectWithValue(err)
    }
})