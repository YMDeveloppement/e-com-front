let _store = null;

export const setStore = (store) => {
    // console.log('setting store => ', store)
    _store = store
 };
export const getStore = (store) => _store ;