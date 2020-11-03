import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { defaultState, reducer } from "./reducer";

export default function configureStore(initialState = defaultState) {
  return createStore(reducer, initialState, applyMiddleware(logger));
}
