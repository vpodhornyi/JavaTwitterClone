import {ACTIONS, closeChatInfo, getUserMessages} from "./action";

const INIT_STATE = {
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
    case String(ACTIONS.setActiveId):
      return {
        ...state,
        activeId: payload.id,
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
