import { cloneDeep } from "lodash";

import { types } from "./action";

export const defaultState = {};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.DELETE_ITEM: {
      const newState = cloneDeep(state);
      // action.payload.id
      return newState;
    }

    default:
      return state;
  }
};
