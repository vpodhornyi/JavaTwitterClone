import { createActions } from "../../utils";
import api, { URLS } from "../../../services/API";
import {ACTIONS as SNACK_ACTIONS} from "../../snack/action";

const actions = createActions(
  {
    actions: [
      'CLEAR_BOOKMARKS',
      'DELETE_BOOKMARK',
      'LIKE_BOOKMARK_TWEET',
    ],
    async: [
      'GET_BOOKMARKS',
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

    return data;
  } catch (err) {
    dispatch(ACTIONS.getBookmarks.fail());
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
};
