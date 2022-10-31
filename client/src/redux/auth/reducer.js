import {getTokens} from "@utils";
import {ACTIONS} from "./action";

const {accessToken} = getTokens();

const INIT_STATE = {
  authorized: Boolean(accessToken),
  loading: false,
  authLogin: 'bob1234',
  user: {
    isBlocked: false,
    isAdmin: false,
    accounts: [],
    _id: "",
    email: "",
    fullName: "",
  },
}

export default (state = INIT_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.setLogin):
      return {
        ...state,
        authLogin: payload.login
      }
    case String(ACTIONS.authorized):
      return {
        ...INIT_STATE,
        authorized: true,
      }
    case String(ACTIONS.unauthorized):
      return {
        ...INIT_STATE,
        authorized: false,
      }
    case String(ACTIONS.login.request):
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}
