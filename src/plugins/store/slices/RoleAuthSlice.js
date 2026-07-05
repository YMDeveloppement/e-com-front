import { createSlice } from '@reduxjs/toolkit';
const getinitialState = () => {
    const initdata = {
        role_auth: {
            "/admin/dashboard" : ["admin"],
            "/admin/products" : ["admin" , 'vendor'],
            "/admin/products/add" : ["admin" , 'vendor'],
        }
    }
    return initdata
};
const authSlice = createSlice({
    name: 'auth',
    initialState: getinitialState(),
    reducers: {

    },

})
export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;