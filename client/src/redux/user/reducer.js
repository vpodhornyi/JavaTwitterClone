import { ACTIONS } from "./action";

const init = {
  preloader: false,
  guestUserLoader: false,
  authUser: {},
  guestUser: {},
  error: "",
  customize: {
    color: 'blue',
    background: 'default',
    fontSize: 14
  }
}

export default (state = JSON.parse(JSON.stringify(init)), { payload, type }) => {
  switch (type) {
    case String(ACTIONS.getAuthUser.request):
      return {
        ...state,
        preloader: true
      }
    case String(ACTIONS.getAuthUser.success):
      return {
        ...state,
        authUser: payload,
        preloader: false
      }
    case String(ACTIONS.getAuthUser.fail):
      return {
        ...state,
        preloader: false,
        error: payload
      }
    case String(ACTIONS.getGuestUser.request):
      return {
        ...state,
        guestUserLoader: true
      }
    case String(ACTIONS.getGuestUser.success):
      return {
        ...state,
        guestUser: payload,
        guestUserLoader: false
      }
    case String(ACTIONS.getGuestUser.fail):
      return {
        ...state,
        guestUserLoader: false,
      }
    case String(ACTIONS.setCustomize):
      state.authUser.customize = { ...payload };
      return {
        ...state,
        customize: { ...state.customize, ...payload }
      }
    case String(ACTIONS.updateCountUnreadMessages):
      const { countUnreadAllChatMessages } = payload;
      if (countUnreadAllChatMessages || countUnreadAllChatMessages === 0) {
        state.authUser.countUnreadMessages = countUnreadAllChatMessages;
      }
      return {
        ...state,
        preloader: false,
        error: payload
      }
    case String(ACTIONS.updateAuthUserInfo): {
      if (state.authUser.id === payload.authUserId) {
        state.authUser.followingsCount = payload.followingsCount;
        state.authUser.followersCount = payload.followersCount;
      }
      return {
        ...state,
      }
    }
    case String(ACTIONS.updateUserProfile.success):
      state.authUser = { ...payload };
      return {
        ...state,
      };
    case String(ACTIONS.resetData):
      state = init;
      return {
        ...state,
      };
    default:
      return state
  }
}
