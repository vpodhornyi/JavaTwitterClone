import {createActions} from '../utils'
import API, {URLS} from "@service/API"
import {setAuthToken, setRefreshToken} from "../../utils";
import {openDialog, closeDialog} from "@redux/dialog/action";
import SingInSecondStep from '@pages/Auth/SingIn/SecondStep';

const {api, axios} = API;
const actions = createActions(
  {
    actions: ["SET_LOGIN", "AUTHORIZED", "UNAUTHORIZED"],
    async: ["AUTH_PING_TEST", "LOGOUT", "LOGIN",],
  },
  {
    prefix: "auth",
  }
)

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}

export const authPingTest = () => dispatch => {
  api.get(URLS.AUTH.PING)
    .then((res) => {
      console.log('auth ping success');
    })
    .catch(() => {
      console.log('auth ping error');
    })
}

export const isAccountExist = (login) => async dispatch => {
  try {
    const {data} = await axios.post(URLS.AUTH.IS_ACCOUNT_EXIST, {login})
    await dispatch(ACTIONS.setLogin(data));
    await dispatch(openDialog(SingInSecondStep));

  } catch (err) {
    console.log('isAccountExist error - ', err);
  }
}

export const login = ({login, password}) => async dispatch => {
  try {
    const {data} = await axios.post(URLS.AUTH.LOGIN, {login, password});
    await dispatch(closeDialog());
    setAuthToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    dispatch(ACTIONS.authorized());

  } catch (err) {
    console.log("login error - ", err)
  }
}

export const logout = () => async dispatch => {
  try {
    await api.get(URLS.USER.LOGOUT)
    setAuthToken();
    setRefreshToken();
    dispatch(ACTIONS.unauthorized());

  } catch (err) {
    console.log('logout error - ', err);
  }
}
