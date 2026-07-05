import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosIns from '@/plugins/axiosIns.js'
import { setAuthToken } from '@/plugins/axiosIns.js'
import { resetAuth } from '../store/slices/authSlice';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await axiosIns.post('/login', userData);
            setAuthToken(data.access_token);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
)

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await api.post('/auth/register', userData);
            // Server returns the new user + token immediately after register
            localStorage.setItem('token', data.token);
            return data; // → goes to fulfilled → saves user + token in slice
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/logout', userData);
            // Server returns the new user + token immediately after register
            return data; // → goes to fulfilled → saves user + token in slice
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
)

export const refreshTokenUser = createAsyncThunk(
    'auth/refreshTokenUser',
    async (_, { dispatch , rejectWithValue }) => {
        try {
            const { data } = await axiosIns.post('/refresh');
            // Server returns the new user + token immediately after register
            return data; // → goes to fulfilled → saves  user + token in slice
        } catch (err) {
            // dispatch(resetAuth())
            resetAuth()
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
)



