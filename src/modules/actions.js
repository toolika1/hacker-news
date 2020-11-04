// types of action
export const types = {
  GET_NEWS: "GET_NEWS",
  NEWS_RECEIVED: "NEWS_RECEIVED",
};

// actions
export const getNews = (q) => ({ q, type: types.GET_NEWS });
