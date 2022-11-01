import {createActions} from '../utils';
import API, {URLS} from "@service/API";

const {api, axios} = API;
const actions = createActions(
  {
    async: ["PING"],
  },
  {
    prefix: "api",
  }
);

export const ACTIONS = {
  ...actions.async,
}

export const pingApi = () => async dispatch => {
  try {
    const {data} = await axios.get(URLS.API.PING);
    await dispatch(ACTIONS.ping.success(data));
    api.baseURL = data.apiVersin;

  } catch (err) {
    console.log('ping server error - ', err);
  }
}
