import {createActions} from '../utils';
import API, {URLS} from "@service/API";
import {setAuthToken, setRefreshToken} from "../../utils";
import {openDialog, closeDialog} from "@redux/dialog/action";
import SingInSecondStep from '@pages/Auth/SingIn/SecondStep';

const {api, axios} = API;
const actions = createActions(
  {
    async: ["IS_ACCOUNT_EXIST", "AUTHORIZE", "LOGOUT"],
  },
  {
    prefix: "auth",
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}

export const isAccountExist = (login) => async dispatch => {
  try {
    dispatch(ACTIONS.isAccountExist.request());
    const {data} = await axios.post(URLS.AUTH.IS_ACCOUNT_EXIST, {login})
    dispatch(ACTIONS.isAccountExist.success(data));
    await dispatch(openDialog(SingInSecondStep));

  } catch (err) {
    console.log('isAccountExist error - ', err);
  }
}

export const authorize = ({login, password}) => async dispatch => {
  try {
    dispatch(ACTIONS.authorize.request());
    const {data} = await axios.post(URLS.AUTH.AUTHORIZE, {login, password});
    dispatch(closeDialog());
    setAuthToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    dispatch(ACTIONS.authorize.success());

  } catch (err) {
    console.log("login error - ", err)
  }
}

export const logout = () => async dispatch => {
  try {
    await api.get(URLS.USER.LOGOUT)
    setAuthToken();
    setRefreshToken();
    dispatch(ACTIONS.logout.success());

  } catch (err) {
    console.log('logout error - ', err);
  }
}
