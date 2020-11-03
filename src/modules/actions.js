// types of action
export const types = {
  GET_NEWS: "GET_NEWS",
  POPUP: "POPUP",
};

// actions
export const getNews = () => ({ type: types.GET_NEWS });
export const popupAction = (popup) => ({ type: types.POPUP, popup });
