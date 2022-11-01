import {ACTIONS} from "./action";

const INIT_STATE = {
  apiVersion: '',
  apiOk: true,
}

export default (state = INIT_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.ping.success):
      return {
        ...state,
        apiVersion: payload.apiVersion,
        apiOk: true
      }
    default:
      return state
  }
}
