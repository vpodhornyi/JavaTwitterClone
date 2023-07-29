import { createActions } from "../../utils";
import api, { URLS } from "../../../services/API";
import {ACTIONS as SNACK_ACTIONS} from "../../snack/action";

const actions = createActions(
  {
    actions: [
      'DELETE_BOOKMARK',
      'LIKE_BOOKMARK_TWEET',
    ],
    async: [
      'GET_BOOKMARKS',
      'CLEAR_BOOKMARKS',
    ],
  },
  {
    prefix: 'bookmark',
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
};

export const getBookmarks = () => async (dispatch, getState) => {
  try {
    const {tweet: {pageNumber, pageSize}} = getState();
    dispatch(ACTIONS.getBookmarks.request());
    const data = await api.get(URLS.TWEETS.BOOKMARKS, {params: {pageNumber, pageSize}});
    dispatch(ACTIONS.getBookmarks.success(data));

  } catch (err) {
    dispatch(ACTIONS.getBookmarks.fail());
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
};

export const clearBookmarks = () => async dispatch => {
  try {
    dispatch(ACTIONS.clearBookmarks.request());
    const data = await api.post(URLS.TWEETS.CLEAR_BOOKMARKS);
    dispatch(ACTIONS.clearBookmarks.success());
    dispatch(SNACK_ACTIONS.open(data));

  } catch (err) {
    dispatch(ACTIONS.clearBookmarks.fail());
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
}
