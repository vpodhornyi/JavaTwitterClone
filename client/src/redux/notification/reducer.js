import {ACTIONS} from './action';

const INIT = {
  loading: false,
  pageNumber: 0,
  pageSize: 10,
  notifications: []
};

export default (state = INIT, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.setPageNumber): {
      return {
        ...state,
        pageNumber: payload.pageNumber,
      }
    }
    case String(ACTIONS.getNotifications.request): {
      return {
        ...state,
        loading: true
      }
    }
    case String(ACTIONS.getNotifications.success): {
      const notifications = payload.elements.filter(e => !state.notifications.find(n => e.id === n.id));
      return {
        ...state,
        loading: false,
        totalPages: payload.totalPages,
        notifications: [...state.notifications, ...notifications]
      }
    }
    case String(ACTIONS.getNotifications.fail): {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return state;
  }
}