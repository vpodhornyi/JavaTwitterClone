import React from "react";
import {BrowserRouter, Router} from "react-router-dom";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import store from './redux/store';
import App from "./App";
import './normolize.css';

const reduxStore = store();
const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);
