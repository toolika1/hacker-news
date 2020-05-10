
  // actions
  const setItemInStore = (PageNumber, storageObj) => {
    if (typeof localStorage !== 'undefined'){
        localStorage.setItem(PageNumber ,storageObj)
    }
   
  };
  
  const getItemFromStore = key => {
    if (typeof localStorage !== 'undefined'){
       return localStorage.getItem(key)
    }
    
  };
  
  export  {
    setItemInStore,
    getItemFromStore,
  };