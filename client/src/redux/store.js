import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {getTokens, setAuthToken} from "@utils";
import {API_ACTIONS as AUTH_ACTIONS} from "./auth/action";

import authReducer from "./auth/reducer";
import dialogReducer from "./dialog/reducer";
import userReducer from "./user/reducer";
import messageReducer from "./message/reducer";
import snackBarReducer from "./snackBar/reducer";
import logoIconReducer from "./business/logoIcon/reducer";
import mainMenuReducer from "./business/menu/mainMenu/reducer";
import themeReducer from "./business/theme/reducer";

const {applyMiddleware, combineReducers, createStore} = require("redux");

const reducer = combineReducers({
  auth: authReducer,
  dialog: dialogReducer,
  user: userReducer,
  message: messageReducer,
  snackBar: snackBarReducer,
  logoIcon: logoIconReducer,
  mainMenu: mainMenuReducer,
  theme: themeReducer,
})

export default () => {
  const {accessToken} = getTokens();
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  if (accessToken) {
    setAuthToken(accessToken)
    // store.dispatch(AUTH_ACTIONS.fetchProfile())
  }

  return store;
}
