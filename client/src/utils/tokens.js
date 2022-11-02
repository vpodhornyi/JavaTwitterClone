import API from "@service/API"

const {api} = API;
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    localStorage.setItem("accessToken", token)
  } else {
    delete api.defaults.headers.common.Authorization
    localStorage.removeItem("accessToken")
  }
}

export const setRefreshToken = (token) => {
  if (token) {
    localStorage.setItem("refreshToken", token)
  } else {
    localStorage.removeItem("refreshToken")
  }
}

export const getTokens = () => {
  return {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  }
}

export const isRefreshTokenExpired = refreshToken => {
  return false;
}
