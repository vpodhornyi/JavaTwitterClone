import {ACTIONS} from "./action";

const init = {
  loader: false,
  searchText: '',
  foundedUsers: [],
  foundedTweets: [],
}

export default (state = init, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.setLoaderTrue):
      return {
        ...state,
        loader: true,
      };
    case String(ACTIONS.setLoaderFalse):
      return {
        ...state,
        loader: false,
      };
    case String(ACTIONS.setSearchText):
      return {
        ...state,
        searchText: payload,
      };
    case String(ACTIONS.setFoundedUsers):
      return {
        ...state,
        foundedUsers: [...payload]
      };
    default:
      return state;
  }
}
