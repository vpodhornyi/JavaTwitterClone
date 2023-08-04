import {createActions} from "../utils";
import api, {URLS} from "../../services/API";
import {ACTIONS as SNACK_ACTIONS} from "../snack/action";
import {ACTIONS as BOOKMARK_ACTIONS} from "./bookmark/action";
import {PATH} from "../../utils/constants";

const actions = createActions(
    {
      actions: [
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
        "REPLY_TWEET",
        "QUOTE_TWEET",
        "GET_TWEETS",
        "ACTIONS_TWEET",
        "RETWEET",
        "LIKE_TWEET",
        "VIEW_TWEET",
        'BOOKMARK_TWEET',
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
    dispatch(ACTIONS.getTweets.fail());
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
};

export const createTweet = (body) => async (dispatch) => {
  try {
    dispatch(ACTIONS.createTweet.request());
    const data = await api.post(URLS.TWEETS.ROOT, body);
    dispatch(ACTIONS.createTweet.success(data));
    dispatch(SNACK_ACTIONS.open({
      message: data.message,
      showMessage: data.showMessage,
    }));

  } catch (err) {
    dispatch(ACTIONS.createTweet.fail());
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
};

export const replyTweet = (body, navigate, background) => async (dispatch) => {
  try {
    console.log(background);
    await dispatch(ACTIONS.replyTweet.request());
    const data = await api.post(URLS.TWEETS.REPLY_TWEET, body);
    await dispatch(ACTIONS.replyTweet.success(data));
    navigate(background.pathname, {
      state: {background}
    });

  } catch (err) {
    dispatch(ACTIONS.replyTweet.fail());
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
};

export const quoteTweet = (body) => async (dispatch) => {
  try {
    dispatch(ACTIONS.quoteTweet.request());
    const data = await api.post(URLS.TWEETS.QUOTE_TWEET, body);
    dispatch(ACTIONS.quoteTweet.success(data));

  } catch (err) {
    dispatch(ACTIONS.quoteTweet.fail());
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
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

export const retweet = (id) => async (dispatch) => {
  try {
    // dispatch(ACTIONS.retweet.request());
    const data = await api.post(URLS.TWEETS.retweet(id));
    dispatch(ACTIONS.retweet.success(data));

  } catch (err) {
    // dispatch(ACTIONS.retweet.fail());
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
};

export const likeTweet = (id) => async (dispatch) => {
  try {
    const data = await api.post(URLS.TWEETS.like(id));
    dispatch(ACTIONS.likeTweet.success(data));
    dispatch(BOOKMARK_ACTIONS.likeBookmarkTweet(data));

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

    if (data.isTweetNotInBookmark) dispatch(BOOKMARK_ACTIONS.deleteBookmark(data));

  } catch (err) {
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
};
