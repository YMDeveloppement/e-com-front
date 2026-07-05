import { createSlice } from '@reduxjs/toolkit';
import {
    loginUser,
    refreshTokenUser
} from '@/plugins/store/thunks/authThunks.js'
import { Nav } from 'react-bootstrap';

const getinitialState = () => {
    let dataSession = localStorage.getItem('userEcom');
    dataSession = !['null', 'undefined', null, ''].includes(dataSession) ? JSON.parse(dataSession) : null
    const initdata = {
        user: dataSession?.user,
        token: dataSession?.token,
        status: 'idle',       // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        roles: dataSession?.roles,
        isAuthenticated: dataSession?.user ? true : false, 
    }
    return initdata
};
const authSlice = createSlice({
    name: 'auth',
    initialState: getinitialState(),
    reducers: {
        resetAuth: (state) => {
            state.user = null
            state.token = null
            state.status = 'idle'
            state.error = null
            state.isAuthenticated = null
            localStorage.removeItem("userEcom");
        },
    },
    extraReducers: (builder) => {
        builder

            // login
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {

                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.access_token;
                state.roles = action.payload.roles  ;
                state.isAuthenticated = true

                localStorage.setItem("userEcom", JSON.stringify({ 'user': state.user, 'token': state.token  , 'roles' : state.roles}));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // "Wrong password" etc.
            })
            // refresh
            .addCase(refreshTokenUser.fulfilled, (state , action) => {
                state.token = action.payload.access_token;
                state.user = action.payload.user;
                state.roles = action.payload.roles  ;
                state.isAuthenticated = true
                localStorage.setItem("userEcom", JSON.stringify({ 'user': state.user, 'token': state.token  , 'roles' : state.roles}));
            })
            .addCase(refreshTokenUser.rejected, (state) => {
                state.isAuthenticated = false
                localStorage.removeItem("userEcom");
                // window.location.href = 'auth/login';
            })

    }

})
export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;