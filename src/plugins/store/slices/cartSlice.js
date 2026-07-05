import { createSlice } from "@reduxjs/toolkit";
import { asynCartWithDB, asyncClearCart } from "@/plugins/store/thunks/cartThunk"
const initialState = {
    cartitems: JSON.parse(localStorage.getItem("cart")) || [],
    stateCard: false,
    cart_prd_ids: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).reduce((acc, item) => { acc[item.id] = item.qty; return acc; }, {}) : {}
}
import axiosIns from '@/plugins/axiosIns.js'
const cartSlice = createSlice({
    name: 'user_cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log({ ...(state.cartitems[0]) })
            const existing = state.cartitems.find(i => i.id == action.payload.id)
            if (existing) {
                const itemIndex = state.cartitems.findIndex(i => i.id === action.payload.id);
                if (itemIndex > -1) {
                    state.cartitems[itemIndex].qty++
                    state.cart_prd_ids[action.payload.id]++

                };
            } else {
                console.log(JSON.parse(localStorage.getItem("cart")))

                let itemToSet = {
                    id: action.payload.id,
                    name: action.payload.name,
                    qty: 1,
                    price: action.payload.price,
                    image: action.payload.image,
                }
                // console.log('Adding item to cart:', itemToSet);
                state.cartitems.push(itemToSet)
                state.cart_prd_ids[action.payload.id] = 1

            }
            // localStorage.setItem("cart", JSON.stringify(state.cartitems))
        },
        removeFromCart: (state, action) => {
            state.cartitems = state.cartitems.filter(
                (i) => i.id !== action.payload
            );
            delete state.cart_prd_ids[action.payload.id]
            // localStorage.setItem("cart", JSON.stringify(state.cartitems))

            // console.log('fnc remove ' + action.payload )
        },
        updateQte: (state, action) => {
            const existing = state.cartitems.find(i => i.id == action.payload.id)
            if (existing) {
                const itemIndex = state.cartitems.findIndex(i => i.id === action.payload.id);
                if (itemIndex > -1) state.cartitems[itemIndex].qty = action.payload.qte;
                console.log('fnc update ' + action.payload.id + ' => ' + action.payload.qte + ' => ', state.cartitems[itemIndex].qty)
                console.log('dddd', JSON.stringify(state.cartitems[itemIndex]))
                state.cart_prd_ids[action.payload.id] = state.cartitems[itemIndex].qty
                console.log('xxxx', JSON.stringify(state.cart_prd_ids[action.payload.id]))

            }
        },
        clearCart: (state) => {
            state.cartitems = [];
            console.log('fnc clearing : ', state.cartitems)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(asynCartWithDB.fulfilled, (state, { payload }) => {
                if (!payload || payload === null || payload === undefined) return
                console.log('payload from db => ', payload)
                state.cartitems = payload;
                localStorage.setItem("cart", JSON.stringify(state.cartitems))
            })
            .addCase(asynCartWithDB.rejected, (state, action) => {
            })
            .addCase(asyncClearCart.fulfilled, (state) => {
                state.cartitems = [];
                localStorage.removeItem("cart")
            })
            .addCase(asyncClearCart.rejected, (state) => {

            })
    }

})

export const { addToCart, removeFromCart, updateQte, clearCart, setCartFromDB } = cartSlice.actions
export default cartSlice.reducer
