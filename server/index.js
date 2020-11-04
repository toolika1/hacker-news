import bodyParser from "body-parser";
import express from "express";
import fs from "fs";
import fetch from "node-fetch";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import path from "path";

import "localstorage-polyfill";

import Home from "../src/Home";
// import { getNews } from "../src/modules/actions";
import createStore from "../src/modules/store";

global["localStorage"] = localStorage;
global["window"] = require("global/window");

const API_KEY = "df1ec0d58213465cb8a82f5a683e151f";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./build"));

app.get("/*", async (req, res) => {
  console.log(req.path, req.query);

  const store = createStore();

  // await store.dispatch(getNews("*"));
  // await new Promise((r) => setTimeout(r, 10 * 1000));

  const { articles } = await fetch(
    `http://newsapi.org/v2/everything?apiKey=${API_KEY}&q=${
      req.query.q || "*"
    }&sortBy=popularity`
  ).then((response) => response.json());
  await store.dispatch({ type: "NEWS_RECEIVED", json: articles || [] });

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter context={{}} location={req.url}>
        <Home />
      </StaticRouter>
    </Provider>
  );
  // console.log("html", html);

  const reduxState = store.getState();
  // console.log("reduxState", reduxState);

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
