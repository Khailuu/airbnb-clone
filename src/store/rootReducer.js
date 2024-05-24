import { combineReducers } from "redux";
import { quanLyNguoiDungReducer } from "./quanLyNguoiDung/slice";

export const rootReducer = combineReducers({
    quanLyNguoiDung: quanLyNguoiDungReducer
})