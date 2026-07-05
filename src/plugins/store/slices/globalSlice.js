import { createSlice } from '@reduxjs/toolkit'
import { Navbar } from 'react-bootstrap';

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        navbar: {
            show: false,
        },
        loading: false,
        error: null,
        role_auth: {
            "/admin/dashboard": ["admin"],
            "/admin/products": ["admin", 'vendor'],
            "/admin/products/add": ["admin", 'vendor'],
        },
        permission_role: {
            'admin': [
                "product.create",
                "product.update",
                "product.delete",
                "product.show",
                "dashboard.product",
                "dashboard.users",
                "dashboard.categories",
                "dashboard.commande",
                "dashboard.payaments",
            ]
        }
    },
    reducers: {
        toggleNav: (state, action) => {
            state.navbar.show = !state.navbar.show;
            document.getElementById('navcart').classList.toggle('show', state.navbar.show);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { toggleNav, setLoading, setError } = globalSlice.actions;
export default globalSlice.reducer;