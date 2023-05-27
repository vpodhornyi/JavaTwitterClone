export const PATH = {
  ROOT: '/',
  HOME: '/home',
  EXPLORE: '/explore',
  NOTIFICATIONS: '/notifications',
  MESSAGES: {
    ROOT: '/messages',
    CHAT: '/messages/:id',
    chat: id => `/messages/${id}`,
    CHAT_INFO: `/messages/:id/info`,
    chatInfo: id => `/messages/${id}/info`,
    GROUP_INFO: `/messages/:id/group-info`,
    groupInfo: id => `/messages/${id}/group-info`,
    PARTICIPANTS: `/messages/:id/participants`,
    participants: id => `/messages/${id}/participants`,
    ADD_PEOPLE: `/messages/:id/add`,
    addPeople: id => `/messages/${id}/add`,
    COMPOSE: '/messages/compose',
    COMPOSE_GROUP: '/messages/compose/group',
  },
  BOOKMARKS: '/i/bookmarks',
  LISTS: `/:user_tag/lists`,
  lists: userTag => `/${userTag}/lists`,
  USER_PROFILE: '/:user_tag',
  USER: {
    PROFILE: '/:user_tag',
    profile: userTag => `/${userTag}`,
    PHOTO: '/:user_tag/photo',
    photo: userTag => `/${userTag}/photo`,
    HEADER_PHOTO: '/:user_tag/header_photo',
    header_photo: userTag => `/${userTag}/header_photo`,
  },
  AUTH: {
    ROOT: '/auth',
    SING_IN: {
      LOGIN: 'sing-in/login',
      PASSWORD: 'sing-in/password',
      FORGOT_PASSWORD: 'sing-in/forgot-password',
    },
    SING_UP: {
      ROOT: 'sing-up',
      SET_DATA: 'sing-up/data',
      CREATE_ACCOUNT: 'sing-up/create',
    },
  },
  NO_MATCHES: '/:user_tag/*',
  SETTINGS: {
    DISPLAY: '/settings/display',
    PROFILE: '/settings/profile',
  },
  COMPOSE: {
    TWEET: '/compose/tweet'
  },
  TWEET: {
    ROOT: "/tweet",
    DELETE: '/tweet/:id',
    REPLY: '/tweet/reply/:id',
    IMG: '/tweet/img',
  },
  ALL: '*',
};

export const CHAT_TYPE = {
  PRIVATE: 'PRIVATE',
  NEW_PRIVATE: 'NEW_PRIVATE',
  GROUP: 'GROUP',
  NEW_GROUP: 'NEW_GROUP',
}


