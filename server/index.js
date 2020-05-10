import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import createStore from '../src/modules/store';
import Home from '../src/Home';
import 'localstorage-polyfill'

global['localStorage'] = localStorage;
const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build'));

app.get('/*', (req, res) => {
  const html = ReactDOMServer.renderToString(
  <Provider store={ createStore() }>
      <Home />
    </Provider>
  )
  const store = createStore()
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  // res.send(renderFullPage(html, preloadedState))

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace(`<!doctype html>
        <html>
          <head>
            <title>Redux Universal Example</title>
          </head>
          <body>
            <div id="root">${html}</div>
            <script>
              // WARNING: See the following for security issues around embedding JSON in HTML:
              // https://redux.js.org/recipes/server-rendering/#security-considerations
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
                /</g,
                '\\u003c'
              )}
            </script>
            <script src="/static/bundle.js"></script>
          </body>`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});