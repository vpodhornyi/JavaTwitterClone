import {ACTIONS} from './action';

const INIT = {
  loading: false,
  pageNumber: 0,
  pageSize: 10,
  countUnreadNotifications: 0,
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
    case String(ACTIONS.addNotification): {
      return {
        ...state,
        notifications: [...state.notifications, payload]
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
      const count = notifications.length ? notifications[0]?.countUnreadNotifications : 0;
      console.log('count = ', count);
      console.log('count = ', notifications[0]);
      return {
        ...state,
        loading: false,
        totalPages: payload.totalPages,
        notifications: [...state.notifications, ...notifications],
        countUnreadNotifications: count
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