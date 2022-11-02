import {ACTIONS} from "./action";

const INIT_STATE = {
  id: 0,
  name: '',
  userTag: '',
  email: '',
  birthDate: '',
  bio: '',
  location: '',
  avatarImgUrl: '',
  headerImgUrl: '',
}

export default (state = INIT_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.setLoginName):
      return {
        ...state,
        loginName: payload.login
      }
    default:
      return state
  }
}
