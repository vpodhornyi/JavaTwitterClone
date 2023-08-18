import {ACTIONS} from "./action";

const INITIAL_STATE = {
  loading: false,
  pageNumber: 0,
  totalPages: 1,
  pageSize: 5,
  replies: []
};

export default (state = INITIAL_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.setPageNumber): {
      return {
        ...state,
        pageNumber: payload.pageNumber,
      }
    }
    case String(ACTIONS.getTweetReplies.request): {
      return {
        ...state,
        loading: true,
      }
    }
    case String(ACTIONS.getTweetReplies.success): {
      const replies = payload.elements.filter(e => !state.replies.find(t => e.id === t.id));
      return {
        ...state,
        loading: false,
        totalPages: payload.totalPages,
        replies: [...state.replies, ...replies],
      }
    }
    case String(ACTIONS.getTweetReplies.fail): {
      return {
        ...state,
        loading: false,
      }
    }
    case String(ACTIONS.replyTweet.request): {
      return {
        ...state,
        loading: true,
      }
    }
    case String(ACTIONS.replyTweet.success): {
      const tweet = state.replies.find(t => t.id === payload.id);
      if (!tweet) {
        state.replies = [payload, ...state.replies];
      }
      return {
        ...state,
        loading: false,
      }
    }
    case String(ACTIONS.replyTweet.fail): {
      return {
        ...state,
        loading: false,
      }
    }
    case String(ACTIONS.reset): {
      return {
        ...state,
        ...INITIAL_STATE
      }
    }
    default: {
      return state;
    }
  }
}
