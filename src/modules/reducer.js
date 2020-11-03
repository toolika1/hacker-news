import immutable from "seamless-immutable";

import { types } from "./actions";

const defaultState = { popup: false };

export const initialState = immutable.from(defaultState);

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.POPUP:
      return { ...state, popup: action.popup };

    case "GET_NEWS":
      return { ...state, loading: true };

    case "NEWS_RECEIVED":
      return { ...state, loading: false, news: action.json };

    default:
      return state;
  }
};
