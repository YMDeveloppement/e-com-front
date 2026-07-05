import axios from 'axios';
import { resetAuth } from '@/plugins/store/slices/authSlice.js';
import { getStore } from '@/plugins/store/storeAccessor';

const axiosIns = axios.create({
  baseURL: 'http://localhost:8000/api/admin/',
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosIns.interceptors.request.use((config) => {

  const store = getStore();
  const token = store.getState().auth.token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosIns.interceptors.response.use(
  (res) => {
    return res
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response,error.response, "error response status")
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { refreshTokenUser } = await import('@/plugins/store/thunks/authThunks.js');
        await getStore().dispatch(refreshTokenUser());
        return axiosIns(originalRequest);  // retry once ✅
      } catch {
        getStore().dispatch({ type: 'auth/resetAuth' });
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
export default axiosIns;