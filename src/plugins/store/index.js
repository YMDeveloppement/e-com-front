import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/plugins/store/slices/authSlice';
import cartSlice from '@/plugins/store/slices/cartSlice';
import globalSlice from '@/plugins/store/slices/globalSlice';
import { setStore } from '@/plugins/store/storeAccessor.js'
import { cartListener } from '@/plugins/store/middelwares/cartMiddelware.js';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice,
        global: globalSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(
            cartListener.middleware
        ),
})

setStore(store)

