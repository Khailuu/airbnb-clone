import { combineReducers } from "redux";
import { quanLyNguoiDungReducer } from "./quanLyNguoiDung/slice";
import { quanLyPhongReducer } from "./quanLyPhong/slice";

export const rootReducer = combineReducers({
    quanLyNguoiDung: quanLyNguoiDungReducer,
    quanLyPhong: quanLyPhongReducer
})