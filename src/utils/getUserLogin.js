import { LOCAL_USER_LOGIN_KEY } from "../constant"

export const getUserLogin = () => {
    const userLogin = localStorage.getItem(LOCAL_USER_LOGIN_KEY)
    if(!userLogin) return
    return JSON.parse(userLogin)
}