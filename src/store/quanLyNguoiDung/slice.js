import { createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungActionThunks } from ".";
import { LOCAL_USER_LOGIN_KEY } from "../../constant";
import { getUserLogin } from "../../utils";

const initialState = {
    isFetchingRegister: false,
    isFetchingLogin: false,
    userLogin: getUserLogin()
};

export const { reducer: quanLyNguoiDungReducer, actions: quanLyNguoiDungAction } = createSlice({
    name: 'quanLyNguoiDung',
    initialState,

    // xử lý action đồng bộ
    reducers: {
        updateUserLogin: (state, action) => {
            state.userLogin = action.payload;
        },
        updateUserAvatar: (state, action) => {
            if (state.userLogin && state.userLogin.user) {
                state.userLogin = {
                    ...state.userLogin,
                    user: {
                        ...state.userLogin.user,
                        avatar: action.payload
                    }
                };
                // Ensure that we store the full userLogin object in localStorage
                localStorage.setItem(LOCAL_USER_LOGIN_KEY, JSON.stringify(state.userLogin));
            }
        },
    },
    
    // xử lý các action bất đồng bộ
    extraReducers: (builder) => {
        builder.addCase(quanLyNguoiDungActionThunks.loginThunk.pending, (state) => {
            state.isFetchingLogin = true;
        })
        .addCase(quanLyNguoiDungActionThunks.loginThunk.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.isFetchingLogin = false;
            localStorage.setItem(LOCAL_USER_LOGIN_KEY, JSON.stringify(payload.content));
            state.userLogin = payload.content;
        })
        .addCase(quanLyNguoiDungActionThunks.loginThunk.rejected, (state) => {
            state.isFetchingLogin = false;
        })
        .addCase(quanLyNguoiDungActionThunks.registerThunk.pending, (state) => {
            state.isFetchingRegister = true;
        })
        .addCase(quanLyNguoiDungActionThunks.registerThunk.fulfilled, (state) => {
            state.isFetchingRegister = false;
        })
        .addCase(quanLyNguoiDungActionThunks.registerThunk.rejected, (state) => {
            state.isFetchingRegister = false;
        });
    }
});
