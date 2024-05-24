import { createSlice } from "@reduxjs/toolkit"
import { quanLyNguoiDungActionThunks } from ".";
import { LOCAL_USER_LOGIN_KEY } from "../../constant";
import { getUserLogin } from "../../utils";

const initialState = {
    isFetchingLogin: false,
    userLogin: getUserLogin()
}

export const { reducer: quanLyNguoiDungReducer, actions: quanLyNguoiDungAction } = createSlice({
    name: 'quanLyNguoiDung',
    initialState,

    // xử lý action đồng bộ
    reducers: {
        
    },
    // xử lý các action bất đồng bộ
    extraReducers: (builder) => {
        builder.addCase(quanLyNguoiDungActionThunks.loginThunk.pending, (state) => {
            state.isFetchingLogin = true
        })
        .addCase(quanLyNguoiDungActionThunks.loginThunk.fulfilled, (state , {payload}) => {
            state.isFetchingLogin = false
            localStorage.setItem(LOCAL_USER_LOGIN_KEY, JSON.stringify(payload.content))
            state.userLogin = payload.content
        })
        .addCase(quanLyNguoiDungActionThunks.loginThunk.rejected, (state) => {
            state.isFetchingLogin = false
        })
    }
})