import axios from 'axios'
import { TOKEN_CYBERSOFT } from './api'

export const apiInstance = {
    create: (configDefault) => {
        const api = axios.create(configDefault)
        api.interceptors.request.use((config) => {
            return {
                ...config,
                headers: {
                    TokenCybersoft: TOKEN_CYBERSOFT,
                    // Authorization: "Bearer " + getUserLogin()?.accessToken// Sử dụng userParse ở đây
                },
            }
        })
        return api
    },
}
