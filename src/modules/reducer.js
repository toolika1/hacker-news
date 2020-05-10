import { Types } from "./action";
import _ from "lodash";

const defaultState = {
  pageNumber: 0
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.CURRENT_PAGE: {
      console.log(action);

      let item = action.payload;
     
      return {...defaultState, pageNumber: item};
    }

    case Types.DELETE_ITEM: {
      let newState = _.cloneDeep(state);
      let index = _.findIndex(newState.items, { id: action.payload });
      newState.items.splice(index, 1);
      return newState;
    }

    default:
      return state;
  }
};

export default todoReducer;