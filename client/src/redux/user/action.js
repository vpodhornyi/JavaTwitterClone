import {createActions} from '../utils';
import api, {URLS} from "../../services/API";
import {ACTIONS as AUTH_ACTIONS} from '../auth/action';
import {ACTIONS as CHAT_ACTIONS} from "../chat/action";
import {ACTIONS as TWEET_ACTIONS} from "../tweet/action";
import {ACTIONS as MESSAGE_ACTIONS} from "../chat/message/action";
import {ACTIONS as SNACK_ACTIONS} from "../snack/action";
import {PATH} from "../../utils/constants";


const actions = createActions(
    {
      actions: ['UPDATE_COUNT_UNREAD_MESSAGES', 'RESET_DATA', 'SET_CUSTOMIZE'],
      async: ['GET_AUTH_USER', 'UPDATE_USER_PROFILE', 'RESET_PASSWORD'],
    },
    {
      prefix: "user",
    }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}

export const getAuthUser = () => async (dispatch) => {
  try {
    dispatch(ACTIONS.getAuthUser.request());
    const data = await api.get(URLS.USERS.ROOT);
    dispatch(ACTIONS.getAuthUser.success(data));
    dispatch(ACTIONS.setCustomize(data?.customize));
    return data;

  } catch (e) {
    console.log(e);
    dispatch(ACTIONS.getAuthUser.fail(e));
    dispatch(AUTH_ACTIONS.authorize.fail());
  }
}

export const updateCustomize = body => async (dispatch) => {
  try {
    const data = await api.put(URLS.USERS.CUSTOMIZE, body);
    dispatch(ACTIONS.setCustomize(data));

  } catch (err) {
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
}

export const updateUserProfile = body => async dispatch => {
  try {
    const user = await api.put(URLS.USERS.PROFILE, body);
    dispatch(ACTIONS.updateUserProfile.success(user));

  } catch (err) {
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
}

export const uploadImage = (body) => async dispatch => {
  try {
    return await api.post(URLS.CLOUD.IMAGE, body);
  } catch (err) {
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
}


export const followUser = (id) => async dispatch => {
  try {
    const data = await api.post(URLS.USERS.FOLLOW, {followUserId: id});
    dispatch(SNACK_ACTIONS.open(data));

  } catch (err) {
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
}

export const authUserSocketSubscribe = () => async (dispatch, getState) => {
  try {
    const {user: {authUser}} = getState();
    authUser?.id && api.stompClient.subscribe(`/topic/tweets`, async (data) => {
      const {body} = JSON.parse(data.body);
      console.log('redit - ', body);
      switch (body?.type) {
        case 'TWEET_LIKE':
          body.authUserId = authUser.id;
          dispatch(TWEET_ACTIONS.updateLikesTweetCount(body));
          break;
        case 'TWEET_VIEW':
          body.authUserId = authUser.id;
          dispatch(TWEET_ACTIONS.updateViewsTweetCount(body));
          break;
        case 'TWEET_BOOKMARK':
          body.authUserId = authUser.id;
          dispatch(TWEET_ACTIONS.updateBookmarksTweetCount(body));
          break;
        case 'UPDATE_BOOKMARKS_COUNT':
          body.authUserId = authUser.id;
          dispatch(TWEET_ACTIONS.updateBookmarksCount(body));
          break;
        case 'REPLY_TWEET':
          body.authUserId = authUser.id;
          dispatch(TWEET_ACTIONS.updateRepliesTweetCount(body));
          break;
        default:
          console.log('no type');
      }

      switch (body?.tweetType) {
        case 'REPLY_TWEET':
          body.authUserId = authUser.id;
          dispatch(TWEET_ACTIONS.updateRepliesTweetCount(body));
          break;
        case 'RETWEET':
          body.authUserId = authUser.id;
          dispatch(TWEET_ACTIONS.updateRetweetCount(body));
          break;
        default:
          console.log('no type');
      }
    });

    authUser?.id && api.stompClient.subscribe(`/queue/user.${authUser.id}`, async (data) => {
      const {body} = JSON.parse(data.body);
      switch (body?.type) {
        case 'MESSAGE_ADD':
          const {chat} = body;
          if (chat && chat.isPrivate) {
            dispatch(CHAT_ACTIONS.addNewPrivateChat(chat));
          } else {
            dispatch(CHAT_ACTIONS.setLastChatAction(body));
          }
          dispatch(MESSAGE_ACTIONS.updateOrAddNewMessage(body));
          dispatch(ACTIONS.updateCountUnreadMessages(body));
          break;
        case 'MESSAGE_DELETE':
          const {lastMessage} = body;
          dispatch(MESSAGE_ACTIONS.deleteMessage(body));
          dispatch(ACTIONS.updateCountUnreadMessages(lastMessage));
          dispatch(CHAT_ACTIONS.setLastChatAction(lastMessage));
          break;
        case 'MESSAGE_OWNER_SEEN':
          dispatch(MESSAGE_ACTIONS.updateMessageOwnerSeen(body));
          break;
        case 'PRIVATE_CHAT':
          dispatch(CHAT_ACTIONS.addNewPrivateChat(body));
          dispatch(ACTIONS.updateCountUnreadMessages(body.lastMessage));
          break;
        case 'GROUP_CHAT':
          dispatch(CHAT_ACTIONS.addNewGroupChat(body));
          dispatch(ACTIONS.updateCountUnreadMessages(body.lastMessage));
          break;
        case 'ADD_TO_GROUP_CHAT':
          dispatch(CHAT_ACTIONS.addUsersToGroupChat(body));
          dispatch(MESSAGE_ACTIONS.addUsersNotification(body));
          break;
        case 'LEAVE_CHAT':
          dispatch(MESSAGE_ACTIONS.leaveChatNotification(body));
          dispatch(CHAT_ACTIONS.deleteUserFromChat(body));
          break;
        default:
          console.log('no type');
      }
    });
  } catch (err) {
    console.log('chatSubscribes error - ', err);
  }
}

export const resetPassword = (login, navigate, background) => async dispatch => {
  try {
    // dispatch(ACTIONS.resetPassword.request());
    const data = await api.post(URLS.USERS.RESET_PASSWORD, {login});
    // dispatch(ACTIONS.resetPassword.success(data));
    dispatch(SNACK_ACTIONS.open(data));
    navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_IN.LOGIN}`, {
      state: {background}
    });
    //TODO add reset password loading

  } catch (err) {
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
    dispatch(ACTIONS.resetPassword.fail());
  }
}
