import {ACTIONS} from "./action";

const INITIAL_STATE = {
  loading: false,
  pageNumber: 0,
  pageSize: 7,
  bookmarks: [],
};

export default (state = INITIAL_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.getBookmarks.request): {
      return {
        ...state,
        loading: true,
      }
    }
    case String(ACTIONS.getBookmarks.success): {
      return {
        ...state,
        bookmarks: payload.elements,
        loading: false,
      }
    }
    case String(ACTIONS.getBookmarks.fail): {
      return {
        ...state,
        loading: false,
      }
    }
    case String(ACTIONS.deleteBookmark): {
      const bookmarks = state.bookmarks.filter(t => t.id !== payload.id);
      return {
        ...state,
        bookmarks,
      }
    }
    case String(ACTIONS.clearBookmarks): {
      return {
        ...state,
        bookmarks: [],
      }
    }
    default: {
      return state;
    }
  }
}
