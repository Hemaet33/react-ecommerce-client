import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
  name:"product",
  initialState:{
    products:[],
    isFetching:false,
    error:false
  },
  reducers:{
    //GET ALL
    getProductStart:(state)=>{
      state.isFetching=true
    },
    getProductSuccess:(state,action)=>{
      state.isFetching=false;
      state.products=action.payload;
      state.error = false;
    },
    getProductFilure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
    //DELETE
    deleteProductStart:(state)=>{
      state.isFetching=true
    },
    deleteProductSuccess:(state,action)=>{
      state.isFetching=false;
      state.products.splice(state.products.findIndex(item=>item._id===action.payload),1);
      state.error = false;
    },
    deleteProductFilure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
    //UPDATE
    updateProductStart:(state)=>{
      state.isFetching=true
    },
    updateProductSuccess:(state,action)=>{
      state.isFetching=false;
      state.products[state.products.findIndex(product=>product._id === action.payload.id)]=action.payload.product;
      state.error = false;
    },
    updateProductFilure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
    //ADD
    addProductStart:(state)=>{
      state.isFetching=true
    },
    addProductSuccess:(state,action)=>{
      state.isFetching=false;
      state.products.push(action.payload);
      state.error = false;
    },
    addProductFilure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
  }
});

export const {getProductStart, getProductSuccess, getProductFilure, deleteProductStart, deleteProductSuccess, deleteProductFilure, updateProductStart, updateProductSuccess, updateProductFilure, addProductStart, addProductSuccess, addProductFilure} = productSlice.actions;
export default productSlice.reducer;