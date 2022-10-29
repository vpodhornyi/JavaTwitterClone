import axios from "axios";
import {getTokens, setAuthToken, setRefreshToken} from "@utils";

const BASE_URL = "/api/v0";
const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.response.use(
  (response) => response.data,
  async function (error) {
    const {refreshToken} = getTokens()
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      return await axios
        .get(`${BASE_URL}/user/refresh-token`, {
          headers: {
            "refresh-token": refreshToken,
          },
        })
        .then(({data}) => {
          setAuthToken(data.jwt)
          setRefreshToken(data.refreshToken)
          originalRequest.headers.Authorization = `Bearer ${data.jwt}`
          return api(originalRequest)
        })
    }

    return Promise.reject(error);
  }
)

export const URLS = {
  AUTH: {
    PING: `/auth/ping`
  },
  USER: {
    _ROOT: "/user",
    ALL_USER: "/user/all",
    LOG_IN: `/user/log-in`,
    LOG_OUT: `/user/log-out`,
    SIGN_UP: `/user/sign-up`,
    PROFILE: "/user/profile",
  }
}

export default api
