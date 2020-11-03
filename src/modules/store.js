import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import "regenerator-runtime/runtime";

import { reducer } from "./reducer";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
  sagaMiddleware.run(sagas);
  return store;
}
