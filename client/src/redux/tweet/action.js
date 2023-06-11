import { createActions } from "../utils";
import api, { URLS } from "../../services/API";

const actions = createActions(
  {
    actions: [
      "CHANGE_BOOKMARK",
      'SET_TWEET_FORM_CAN_REPLY',
      'SET_TWEET_FORM_TEXT',
      'SET_TWEET_FORM_IMAGES',
      'SET_TWEET_FORM_IMAGES_SRC',
      'SET_TWEET_FORM_DELETE_IMAGE',
    ],
    async: [
      "DELETE_TWEET",
      "CREATE_TWEET",
      "GET_TWEETS",
      "CHANGE_ACTIONS_TWEET",
      "HANDLER_BOOKMARK",
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
export const getTweets = () => async (dispatch) => {
  try {
    dispatch(ACTIONS.getTweets.request());
    const data = await api.get(URLS.TWEET.ROOT);
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
      canReply: form.canReply,
      images: form.images,
      body: form.text,
    }
    const data = await api.post(URLS.TWEET.ROOT, body);
    console.log(data);
    //
    // dispatch(ACTIONS.createTweet.success(data));
  } catch (err) {
    //TODO show error
    dispatch(ACTIONS.createTweet.fail());
    console.log("createTweet error - ", err);
  }
};
export const deleteTweet = (userId, tweetID) => async (dispatch) => {
  try {
    dispatch(ACTIONS.deleteTweet.request());
    const data = await api.delete(`${URLS.TWEET._ROOT + userId}/${tweetID}`);
    console.log(tweetID);
    dispatch(ACTIONS.deleteTweet.success(tweetID));
  } catch (err) {
    //TODO show error
    dispatch(ACTIONS.deleteTweet.fail());
    alert("deleteTweet error - This is not your tweet");
  }
};
export const changeActionsTweet = (obj) => async (dispatch) => {
  try {
    dispatch(ACTIONS.changeActionsTweet.request());
    const data = await api.post(URLS.TWEET.CHANGE_ACTIONS, obj);
    dispatch(ACTIONS.changeActionsTweet.success(data));
    return data;
  } catch (err) {
    dispatch(ACTIONS.changeActionsTweet.fail());
    alert(err.message);
  }
};
export const changeBookmark = (id) => (dispatch) => {
  dispatch(ACTIONS.changeBookmark(id));
};
export const handlerBookmark = () => async (dispatch) => {
  try {
    dispatch(ACTIONS.handlerBookmark.request());
    const bookmarksId = await api.get(URLS.TWEET.BOOKMARKS);
    dispatch(ACTIONS.handlerBookmark.success(bookmarksId));

  } catch (err) {
    //TODO show error
    dispatch(ACTIONS.handlerBookmark.fail());
    console.log("getBookmarks error - ", err);
  }
};
