import {createActions} from '../utils';
import API, {URLS} from "@service/API";


const {api} = API;
const actions = createActions(
  {
    actions: [],
    async: ["GET_USER_BASE_DATA"],
  },
  {
    prefix: "user",
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}


export const getUserBaseData = () => async dispatch => {
  try {
    await api.get(URLS.USER.LOGOUT)


  } catch (err) {
    console.log('logout error - ', err);
  }
}
