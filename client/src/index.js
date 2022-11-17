import React from "react";
import store from '@redux/store';
import {Provider} from "react-redux";
import App from "@containers/AppContainer";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import './normolize.css';


const reduxStore = store();
const element = document.getElementById("root");
element.style.height = '100%';

const root = createRoot(element);

root.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>);
