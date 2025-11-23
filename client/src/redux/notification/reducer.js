import {ACTIONS} from './action';

const INIT = {
  loading: false,
  pageNumber: 0,
  pageSize: 10,
  totalPages: 0,
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
    case String(ACTIONS.setCountUnreadNotifications): {
      return {
        ...state,
        countUnreadNotifications: payload,
      }
    }
    case String(ACTIONS.addNotification): {
      const notifications = [...state.notifications, payload].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return {
        ...state,
        notifications,
        countUnreadNotifications: payload.countUnreadNotifications
      }
    }
    case String(ACTIONS.updateIsFollowing): {
      const notification = state.notifications.find(n => n.id === payload.id);
      notification.userInitiator.isFollowing = !notification.userInitiator.isFollowing;
      return {
        ... state,
        notifications: [...state.notifications ],
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
      const count = payload.elements.length ? payload.elements[0]?.countUnreadNotifications : 0;
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
    case String(ACTIONS.markRead.request): {
      return {
        ...state,
      }
    }
    case String(ACTIONS.markRead.success): {
      const notifications = state.notifications.filter(n => !payload.includes(n.id));
      return {
        ...state,
        notifications,
        countUnreadNotifications: state.countUnreadNotifications - 1,
      }
    }
    case String(ACTIONS.markRead.fail): {


      return {
        ...state,
        loading: false,
      }
    }
    case String(ACTIONS.resetGetNotifications): {
      return {
        ...state,
        pageNumber: 0,
        pageSize: 7,
        totalPages: 0,
        notifications: [],
      }
    }
    default:
      return state;
  }
}