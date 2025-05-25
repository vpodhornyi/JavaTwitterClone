import {ACTIONS} from "./action";

const init = {
  searchText: '',
  foundedUsers: [],
  foundedTweets: [],
}

export default (state = init, {payload, type}) => {
  switch (type) {
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
