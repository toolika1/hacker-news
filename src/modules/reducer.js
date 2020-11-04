import immutable from "seamless-immutable";

import { types } from "./actions";

const defaultState = { news: [] };

export const initialState = immutable.from(defaultState);

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NEWS:
      return { ...state, loading: true, news: [], q: action.q };

    case types.NEWS_RECEIVED:
      return { ...state, loading: false, news: action.json };

    default:
      return state;
  }
};
