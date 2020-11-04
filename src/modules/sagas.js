import fetch from "node-fetch";
import { all, put, takeLatest } from "redux-saga/effects";

import { types } from "./actions";

function* fetchNews(action) {
  // console.log("action", action);
  const json = yield fetch(
    `http://newsapi.org/v2/everything?apiKey=efe4939644a94699bfe4a3fdeb85b994&q=${
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
