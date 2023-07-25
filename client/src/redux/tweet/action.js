import { createActions } from "../utils";
import api, { URLS } from "../../services/API";
import {ACTIONS as SNACK_ACTIONS} from "../snack/action";

const actions = createActions(
  {
    actions: [
      "CHANGE_BOOKMARK",
      'SET_TWEET_FORM_CAN_REPLY',
      'SET_TWEET_FORM_TEXT',
      'SET_TWEET_FORM_IMAGES',
      'SET_TWEET_FORM_IMAGES_SRC',
      'SET_TWEET_FORM_DELETE_IMAGE',
      'UPDATE_LIKES_TWEET_COUNT',
    ],
    async: [
      "DELETE_TWEET",
      "CREATE_TWEET",
      "GET_TWEETS",
      "ACTIONS_TWEET",
      "HANDLER_BOOKMARK",
      "LIKE_TWEET",
      "BOOKMARK_TWEET",
      "VIEW_TWEET",
    ],
  },
  {
    prefix: "tweet",
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
};
export const getTweets = () => async (dispatch, getState) => {
  try {
    const {tweet: {pageNumber, pageSize}} = getState();
    dispatch(ACTIONS.getTweets.request());
    const data = await api.get(URLS.TWEETS.ROOT, {params: {pageNumber, pageSize}});
    dispatch(ACTIONS.getTweets.success(data));

    return data;
  } catch (err) {
    //TODO show error
    dispatch(ACTIONS.getTweets.fail());
    console.log("getTweets error - ", err);
  }
};
export const createTweet = (obj) => async (dispatch, getState) => {
  try {
    dispatch(ACTIONS.createTweet.request());
    const {tweet: {form}} = getState();
    const body = {
      tweetType: 'TWEET',
      tweetCanReply: form.canReply,
      images: form.images.map(v => v.src),
      body: form.text,
    }
    const data = await api.post(URLS.TWEETS.ROOT, body);
    //
    dispatch(ACTIONS.createTweet.success(data));
  } catch (err) {
    //TODO show error
    dispatch(ACTIONS.createTweet.fail());
    console.log("createTweet error - ", err);
  }
};
export const deleteTweet = (tweetId) => async (dispatch) => {
  try {
    const data = await api.delete(`${URLS.TWEETS.ROOT}/${tweetId}`);
    dispatch(SNACK_ACTIONS.open(data));
    dispatch(ACTIONS.deleteTweet.success(data));

  } catch (err) {
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
};

export const likeTweet = (id) => async (dispatch) => {
  try {
    const data = await api.post(URLS.TWEETS.like(id));
    dispatch(ACTIONS.likeTweet.success(data));

    api.stompClient.send('/send')

  } catch (err) {
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
};

export const viewTweet = (id) => async (dispatch) => {
  try {
    const data = await api.post(URLS.TWEETS.view(id));
    dispatch(ACTIONS.viewTweet.success(data));

  } catch (err) {
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
};

export const bookmarkTweet = (id) => async (dispatch) => {
  try {
    const data = await api.post(URLS.TWEETS.bookmark(id));
    dispatch(ACTIONS.bookmarkTweet.success(data));

  } catch (err) {
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
};

export const changeBookmark = (id) => (dispatch) => {
  dispatch(ACTIONS.changeBookmark(id));
};

export const handlerBookmark = () => async (dispatch) => {
  try {
    dispatch(ACTIONS.handlerBookmark.request());
    const bookmarksId = await api.get(URLS.TWEETS.BOOKMARKS);
    dispatch(ACTIONS.handlerBookmark.success(bookmarksId));

  } catch (err) {
    //TODO show error
    dispatch(ACTIONS.handlerBookmark.fail());
    console.log("getBookmarks error - ", err);
  }
};
