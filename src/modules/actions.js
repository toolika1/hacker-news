// types of action
export const types = {
  CLEAR_NEWS: "CLEAR_NEWS",
  GET_NEWS: "GET_NEWS",
  NEWS_RECEIVED: "NEWS_RECEIVED",
  NEWS_SELECTED: "NEWS_SELECTED",
};

// actions
export const clearNews = () => ({ type: types.CLEAR_NEWS });
export const getNews = (q) => ({ q, type: types.GET_NEWS });
export const selectNews = (newsId) => ({
  newsId,
  type: types.NEWS_SELECTED,
});
