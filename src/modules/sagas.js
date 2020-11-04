import fetch from "node-fetch";
import { all, put, takeLatest } from "redux-saga/effects";

import { types } from "./actions";

const API_KEY = "df1ec0d58213465cb8a82f5a683e151f";

function* fetchNews(action) {
  // console.log("action", action);
  const json = yield fetch(
    `http://newsapi.org/v2/everything?apiKey=${API_KEY}&q=${
      action.q || "*"
    }&sortBy=popularity`
  ).then((response) => response.json());
  yield put({ type: types.NEWS_RECEIVED, json: json.articles || [] });
}

function* actionWatcher() {
  yield takeLatest(types.GET_NEWS, fetchNews);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
