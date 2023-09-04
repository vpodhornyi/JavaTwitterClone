import {createActions} from "../utils";
import api, {URLS} from "../../services/API";
import {ACTIONS as SNACK_ACTIONS} from "../snack/action";


const actions = createActions(
    {
      actions: [
        'SET_TWEET_FORM_CAN_REPLY',
        'SET_TWEET_FORM_TEXT',
        'SET_TWEET_FORM_IMAGES',
        'SET_TWEET_FORM_IMAGES_SRC',
        'SET_TWEET_FORM_DELETE_IMAGE',
        'UPDATE_LIKES_TWEET_COUNT',
        'UPDATE_VIEWS_TWEET_COUNT',
        'UPDATE_BOOKMARKS_TWEET_COUNT',
        'UPDATE_BOOKMARKS_COUNT',
        'UPDATE_REPLIES_TWEET_COUNT',
        'UPDATE_RETWEET_COUNT',
        'SET_SELECTED_TWEET',
        'RESET_SELECTED_TWEET',
        'SET_PAGE_NUMBER',
        'RESET_GET_TWEETS',
        'DELETE_BOOKMARK',
      ],
      async: [
        "DELETE_TWEET",
        "CREATE_TWEET",
        "QUOTE_TWEET",
        "GET_TWEETS",
        "GET_TWEET_BY_ID",
        "ACTIONS_TWEET",
        "RETWEET",
        "LIKE_TWEET",
        "REPLY_TWEET",
        "VIEW_TWEET",
        'BOOKMARK_TWEET',
        'CLEAR_BOOKMARKS',
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
export const getTweetById = id => async (dispatch) => {
  try {
    dispatch(ACTIONS.getTweetById.request());
    const data = await api.get(URLS.TWEETS.getTweetById(id));
    dispatch(ACTIONS.getTweetById.success(data));

  } catch (err) {
    dispatch(ACTIONS.getTweetById.fail());
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
};
export const getTweets = (url) => async (dispatch, getState) => {
  try {
    const {tweet: {pageNumber, pageSize}} = getState();
    dispatch(ACTIONS.getTweets.request());
    const data = await api.get(url, {params: {pageNumber, pageSize}});

    if (data?.elements.length > 0) dispatch(ACTIONS.setPageNumber({pageNumber: pageNumber + 1}));

    dispatch(ACTIONS.getTweets.success(data));

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

  } catch (err) {
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
};
export const replyTweet = (body, navigate, background, isNavigate) => async (dispatch) => {
  try {
    await dispatch(ACTIONS.replyTweet.request());
    const data = await api.post(URLS.TWEETS.REPLY_TWEET, body);
    await dispatch(ACTIONS.replyTweet.success(data));

    if (isNavigate) {
      navigate(background.pathname, {
        state: {background}
      });
    }

    dispatch(SNACK_ACTIONS.open({
      message: data.message,
      showMessage: data.showMessage
    }));

  } catch (err) {
    dispatch(ACTIONS.replyTweet.fail());
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
export const bookmarkTweet = (id, isBookmarks = false) => async (dispatch) => {
  try {
    const data = await api.post(URLS.TWEETS.bookmark(id));
    dispatch(ACTIONS.bookmarkTweet.success(data));
    dispatch(SNACK_ACTIONS.open({
      message: data.message,
      showMessage: data.showMessage,
    }));

    if (data.isTweetNotInBookmark && isBookmarks) dispatch(ACTIONS.deleteBookmark(data));

  } catch (err) {
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
