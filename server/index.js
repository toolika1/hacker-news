// import bodyParser from "body-parser";
import express from "express";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import path from "path";

import "localstorage-polyfill";

import Home from "../src/Home";
import { getNews } from "../src/modules/actions";
import createStore from "../src/modules/store";

global["localStorage"] = localStorage;
global["window"] = require("global/window");

const app = express();

app.use(express.static("./build"));

app.get("/*", async (req, res) => {
  const context = {};
  const store = createStore();

  await store.dispatch(getNews("*"));

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={req.path}>
        <Home />
      </StaticRouter>
    </Provider>
  );
  console.log("html", html);

  const reduxState = store.getState();
  console.log("reduxState", reduxState);

  const build = fs.readFileSync(path.resolve("./build/index.html"), "utf8");
  return res.send(
    build.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div><script>window.REDUX_DATA=${JSON.stringify(
        reduxState
      )}</script>`
    )
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`localhost:${process.env.PORT || 3000}`);
});
