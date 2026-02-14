import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {Client} from "@stomp/stompjs";

import api from "@services/API";
import {getTokens, setHeaderAuthorization} from "@utils";
import {interceptor} from "@services/API";
import {ACTIONS, authUserSocketSubscribe, getAuthUser} from "./user/action";
import {setFontSize, setBackgroundColor} from "@utils/theme";

import tweetReducer from "./tweet/reducer";
import authReducer from "./auth/reducer";
import userReducer from "./user/reducer";
import dialogReducer from "./dialog/reducer";
import snackReducer from "./snack/reducer";
import exploreReducer from "./explore/reducer";
import notificationReducer from "./notification/reducer";

import chatReducer from "./chat/reducer";
import messagesReducer from "./chat/message/reducer";

const {applyMiddleware, combineReducers, createStore} = require("redux");

const reducer = combineReducers({
  chat: chatReducer,
  message: messagesReducer,
  tweet: tweetReducer,
  auth: authReducer,
  user: userReducer,
  dialog: dialogReducer,
  snack: snackReducer,
  explore: exploreReducer,
  notification: notificationReducer,
})

const wsProtocol =
  window.location.protocol === "https:" ? "wss" : "ws";

const brokerURL = `${wsProtocol}://${window.location.host}/ws`;

const stompClient = (onConnect) => {
  const client = new Client({
    brokerURL,
    connectHeaders: {
      login: 'user',
      passcode: 'password',
    },
    debug: function (str) {
      // console.log(str);
    },
    reconnectDelay: 3000,
    onConnect,
  });

  client.activate();
  return client;
}

export default () => {
  const {accessToken, tokenType} = getTokens();
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  interceptor(store);

  if (accessToken) {
    setHeaderAuthorization(accessToken, tokenType);
    store.dispatch(getAuthUser())
      .then((user) => {
        setFontSize(user?.customize.fontSize);
        setBackgroundColor(user?.customize.background);
        store.dispatch(ACTIONS.setCustomize(user?.customize));
        api.stompClient = stompClient(() => {
          store.dispatch(authUserSocketSubscribe());
        });
      })
  }

  return store;
}
