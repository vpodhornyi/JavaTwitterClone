import {createActions} from '../utils';
import API, {URLS} from "@service/API";


const {api} = API;
const actions = createActions(
  {
    actions: ['SET_ACTIVE_ID', 'CLOSE_CHAT_INFO', 'OPEN_CHAT_INFO'],
    async: ["GET_MESSAGES_USERS"],
  },
  {
    prefix: "message",
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}


export const getUsersRoutes = () => async dispatch => {
  try {
    await api.get()


  } catch (err) {
    console.log('logout error - ', err);
  }
}

export const getUserMessages = ({id}) => async dispatch => {
  try {
    dispatch(ACTIONS.setActiveId({id}))
    // await api.get()

  } catch (err) {
    console.log('logout error - ', err);
  }
}

export const openChatInfo = () => async dispatch => {
  dispatch(ACTIONS.openChatInfo());
}

export const closeChatInfo = () => async dispatch => {
  dispatch(ACTIONS.closeChatInfo());
}
