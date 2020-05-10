
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import Home from './Home';
import 'antd/dist/antd.less'
import 'antd/dist/antd.css';
import './Home.css'
export const history = createBrowserHistory();
ReactDOM.hydrate(
  <Router  history={history}>
  <Route path = "/hacker-news" component = {Home}>
  </Route>
</Router>
,
  document.getElementById('root')
);
