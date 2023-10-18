import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
export const getProducts = createAsyncThunk('products/getProducts', async()=>{
    return fetch("https://students.trungthanhweb.com/api/home?apitoken="+localStorage.getItem('token'))
    .then((res)=>res.json());
})
export const productsSlice = createSlice({
    name:'products',
    initialState:{
        product:[],
        loading2:false
    },
    extraReducers:{
        [getProducts.pending]:(state,action)=>{
            state.loading2=true;
        },
        [getProducts.fulfilled]:(state,action)=>{
            state.loading2=false;
            state.products=action.payload.products;
        },
        [getProducts.rejected]:(state,action)=>{
            state.loading2=false;
        }
    }
})
export default productsSlice.reducer