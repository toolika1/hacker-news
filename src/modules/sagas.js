import { put, takeLatest, all } from "redux-saga/effects";

const API_URL =
  "http://newsapi.org/v2/everything?apiKey=efe4939644a94699bfe4a3fdeb85b994&q=*&sortBy=publishedAt";

function* fetchNews() {
  const json = yield fetch(API_URL).then((response) => response.json());
  yield put({ type: "NEWS_RECEIVED", json: json.articles });
}

function* actionWatcher() {
  yield takeLatest("GET_NEWS", fetchNews);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
