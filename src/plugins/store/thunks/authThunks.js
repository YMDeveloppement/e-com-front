import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosIns from '@/plugins/axiosIns.js'
// import { asynCartWithDB } from '@/plugins/store/thunks/cartThunk.js'
// import { Collapse } from 'react-bootstrap';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { dispatch, getState, rejectWithValue }) => {
        try {
            const res = await axiosIns.post('/login', userData);
            const { data } = res
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
)

export const refreshTokenUser = createAsyncThunk(
    'auth/refreshTokenUser',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosIns.post('/refresh');
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
)



