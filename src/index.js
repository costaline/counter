import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "~src/app";
import store from "~src/store";

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

const path = document.getElementById("root");

ReactDOM.render(app, path);
