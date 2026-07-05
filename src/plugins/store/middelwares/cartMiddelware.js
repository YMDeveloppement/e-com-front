import {
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';

import {
  addToCart,
  updateQte,
  removeFromCart,
} from '@/plugins/store/slices/cartSlice';
import {
  asynCartWithDB
} from '@/plugins/store/thunks/cartThunk';


const cartListener = createListenerMiddleware();

cartListener.startListening({
  matcher: isAnyOf(
    addToCart,
    updateQte,
    removeFromCart
  ),

  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners()   // cancel previous delay + request
    await listenerApi.delay(1000)
    console.log('state.cart.cart_prd_ids ' , listenerApi.getState().cart)

    console.log('Middelware : Cart updated, syncing with database...' , action.payload);
    const state = listenerApi.getState();

    // listenerApi.getState().cart.cart_prd_ids[action.payload.id] = action.payload.qty
    // console.log('state.cart.cart_prd_ids--- ' , listenerApi.getState().cart.cart_prd_ids)
    // console.log('Cart items => ', state.cart.cart_prd_ids)

    // state.cart.cartitems.forEach(item => {
    //   state.cart.cart_prd_ids[item.id] = item.qty
    // })
    localStorage.setItem("cart", JSON.stringify(state.cart.cartitems))
    // console.log('Cart state after update => ', state.cartitems)
    console.log('middelware')
    if (!state.auth.user) return
    // sync full cart to database
    await listenerApi.dispatch(asynCartWithDB())
  },
});

export { cartListener }