import {ACTIONS} from "./action";

const INIT_STATE = {
  navigationLoading: false,
  detailLoading: false,
  sendingMessage: false,
  isChatInfo: false,
  activeId: -1,
  users: [
    {
      id: 0,
      name: 'Bob Marley',
      userTag: '@bob1234',
      email: 'bob@gmail.com',
      birthDate: '',
      bio: '',
      location: '',
      avatarImgUrl: '',
      headerImgUrl: '',
    },
    {
      id: 1,
      name: 'Alex Black',
      userTag: '@bob1234',
      email: 'bob@gmail.com',
      birthDate: '',
      bio: '',
      location: '',
      avatarImgUrl: '',
      headerImgUrl: '',
    },
    {
      id: 2,
      name: 'Lee Marley',
      userTag: '@bob1234',
      email: 'bob@gmail.com',
      birthDate: '',
      bio: '',
      location: '',
      avatarImgUrl: '',
      headerImgUrl: '',
    },
  ]
}

export default (state = INIT_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.navigationLoading):
      return {
        ...state,
        navigationLoading: !state.navigationLoading,
      };
      case String(ACTIONS.detailLoading):
      return {
        ...state,
        detailLoading: !state.detailLoading,
      };
      case String(ACTIONS.setActiveId):
      return {
        ...state,
        activeId: payload.id,
        isChatInfo: false,
      };
    case String(ACTIONS.resetActiveId):
      return {
        ...state,
        activeId: -1,
        isChatInfo: false,
      };
    case String(ACTIONS.openChatInfo):
      return {
        ...state,
        isChatInfo: true,
      };
    case String(ACTIONS.closeChatInfo):
      return {
        ...state,
        isChatInfo: false,
      }
    default:
      return state;
  }
}
