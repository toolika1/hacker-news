// types of action
export const types = {
  CLEAR_NEWS: "CLEAR_NEWS",
  GET_NEWS: "GET_NEWS",
  NEWS_RECEIVED: "NEWS_RECEIVED",
};

// actions
export const clearNews = (q) => ({ q, type: types.CLEAR_NEWS });
export const getNews = (q) => ({ q, type: types.GET_NEWS });
