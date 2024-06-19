import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_LIKE_CART } from "../../constant";
import { parse } from "date-fns";

const initialState = {
  likeCart: JSON.parse(localStorage.getItem(LOCAL_LIKE_CART)) || [],
};

export const { reducer: quanLyPhongReducer, actions: quanLyPhongActions } =
  createSlice({
    name: "quanLyPhong",
    initialState,

    reducers: {
      addLikeCart: (state, action) => {
        const index = state.likeCart.findIndex((like) => {
          return like.id === action.payload.id;
        });
        console.log(index);
        if (index !== -1) {
          state.likeCart.splice(index, 1);
          localStorage.setItem(LOCAL_LIKE_CART, JSON.stringify(state.likeCart));
        } else {
          state.likeCart.push(action.payload);
          localStorage.setItem(LOCAL_LIKE_CART, JSON.stringify(state.likeCart));
        }
      },
    },
  });
