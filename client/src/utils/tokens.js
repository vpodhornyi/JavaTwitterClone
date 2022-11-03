import API from "@service/API"

const {api} = API;

export const setHeaderAuthorization = (token, type) => {
  if (token) {
    api.defaults.headers.common.Authorization = `${type} ${token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
}

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
}

export const setRefreshToken = (token) => {
  if (token) {
    localStorage.setItem("refreshToken", token);
  } else {
    localStorage.removeItem("refreshToken");
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
