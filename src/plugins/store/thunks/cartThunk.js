import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosIns from '@/plugins/axiosIns.js'
const asynCartWithDB = createAsyncThunk(
    'cart/asynCartWithDB',
    async (_, { dispatch, getState ,signal, rejectWithValue }) => {
        try {
            console.log(getState().auth.user , new Date().toLocaleTimeString())
            const auth = getState().auth
            const user_id = auth.user?.id;

            const dataCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') ) : [];
            const response = await axiosIns.post("/cart/sync", { items: dataCart } ,{ signal });
            return response?.data
            
        } catch (ex) {
            if (axios.isCancel(err)) return
            rejectWithValue(() => err.response?.data?.message || 'Registration failed')
        }
    }
)

const asyncClearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, { dispatch, getState, rejectWithValue }) => {
        try {
            const authStore = getState().auth
            if(authStore.user && authStore.isAuthenticated){
                await axiosIns.post("/cart/clear");
            } 
        } catch (ex) {
            rejectWithValue(() => ex.response?.data?.message || 'Registration failed')
        }
    }
)

export { asynCartWithDB , asyncClearCart }