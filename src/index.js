
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import createStore from './modules/store';
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
   <Provider store={ createStore() }>
  <Route path = "/hacker-news" component = {Home}>

  </Route>
  </Provider>
</Router>

,
  document.getElementById('root')
);
