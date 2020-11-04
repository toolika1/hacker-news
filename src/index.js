import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";

import createStore from "./modules/store";

import "antd/dist/antd.css";
import "antd/dist/antd.less";

import "./index.css";

import App from "./App";
import Home from "./Home";

export const history = createBrowserHistory();

ReactDOM.hydrate(
  <Provider store={createStore(window.REDUX_DATA)}>
    <Router history={history}>
      <Route exact path="/app" component={App}></Route>
      <Route exact path="/" component={Home}></Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
