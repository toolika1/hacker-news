// types of action
const Types = {
    CURRENT_PAGE: "CURRENT_PAGE",
    DELETE_ITEM: "DELETE_ITEM"
  };
  // actions
  const updatePage = (task) => {
    console.log('action called', task)
    return{
    type: Types.CURRENT_PAGE,
    payload: task
    }
  };
  
  const deleteItem = id => ({
    type: Types.DELETE_ITEM,
    payload: id
  });
  
  export  {
    updatePage,
    deleteItem,
    Types
  };