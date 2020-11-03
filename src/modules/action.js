// types of action
export const types = {
  DELETE_ITEM: "DELETE_ITEM",
};

// actions
export const deleteItem = (id) => ({
  type: types.DELETE_ITEM,
  payload: { id },
});
