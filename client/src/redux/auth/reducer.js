import {getTokens} from "@utils";
import {ACTIONS} from "./action";

const {accessToken} = getTokens();

const INIT_STATE = {
  // authorized: Boolean(accessToken),
  authorized: true,
  loading: false,
  loginName: 'bob1234',
  routes: [],
  menu: [],
}

export default (state = INIT_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.setRoutes):
      return {
        ...state,
        routes: payload.routes,
      }
    case String(ACTIONS.setMenu):
      return {
        ...state,
        menu: payload.menu,
      }
    case String(ACTIONS.isAccountExist.request):
    case String(ACTIONS.authorize.request):
      return {
        ...state,
        loading: true,
      }
    case String(ACTIONS.isAccountExist.success):
      return {
        ...state,
        loginName: payload.login,
        loading: false,
      }
    case String(ACTIONS.authorize.success):
      return {
        ...INIT_STATE,
        authorized: true,
        loading: false,
      }
    case String(ACTIONS.logout.success):
      return {
        ...INIT_STATE,
        authorized: false,
      }
    case String(ACTIONS.isAccountExist.fail):
    case String(ACTIONS.authorize.fail):
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
