
  // actions
  const setItemInStore = (PageNumber, storageObj) => (
    localStorage.setItem(PageNumber ,storageObj)
  );
  
  const getItemFromStore = key => (
    localStorage.getItem(key)
  );
  
  export  {
    setItemInStore,
    getItemFromStore,
  };