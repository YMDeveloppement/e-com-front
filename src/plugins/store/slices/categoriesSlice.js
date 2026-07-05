import { createSlice } from '@reduxjs/toolkit'
import axiosIns from '@/plugins/axiosIns.js'
const initialState = { categories : {} }

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getData(state) {
        axiosIns.get('products/categories')
        .then(({categories}) => {
            state.categories = categories
        }).catch((ex)=>{})
    },
  },
})

export default categoriesSlice.reducer 