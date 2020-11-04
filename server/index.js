// import bodyParser from "body-parser";
import express from "express";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import path from "path";

import "localstorage-polyfill";

import Home from "../src/Home";
import createStore from "../src/modules/store";

global["localStorage"] = localStorage;
global["window"] = require("global/window");

const app = express();

app.use(express.static("./build"));

app.get("/*", (req, res) => {
  const html = ReactDOMServer.renderToString(
    <Provider store={createStore()}>
      <Home />
    </Provider>
  );

  console.log("html", html);

  const store = createStore();
  const preLoadedState = store.getState();

  console.log("preLoadedState", preLoadedState);

  fs.readFile(path.resolve("./build/index.html"), "utf8", (error, data) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }

    return res.send(`<!doctype html>
        <html lang="en">
          <head>
            <title>HackerNews</title>
          </head>
          <body>
            <div id="root">${html}</div>
            <script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(
                preLoadedState
              ).replace(/</g, "\\u003c")}
            </script>
            <script src="/static/bundle.js"></script>
          </body>
        </html>`);
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`localhost:${process.env.PORT || 3000}`);
});
