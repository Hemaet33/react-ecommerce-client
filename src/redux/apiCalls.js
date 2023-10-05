import { loginFilure, loginStart, loginSuccess,logoutFilure, logoutStart, logoutSuccess } from "./userRedux"

import { addProductFilure, addProductStart, addProductSuccess, deleteProductFilure, deleteProductStart, deleteProductSuccess, getProductFilure, getProductStart, getProductSuccess, updateProductFilure, updateProductStart, updateProductSuccess } from "./productRedux"
import {publicRequest, userRequest} from '../requestMethods';
import { getStorage, ref, deleteObject } from "firebase/storage";
import app from "../firebase";

export const userLogin = async(dispatch,user)=>{
 dispatch(loginStart());
 
 try {
  const res = await publicRequest.post('/auth/login',user);
  await dispatch(loginSuccess(res.data))
 } catch (error) {
  dispatch(loginFilure())
 }
}

export const userLogout=(dispatch)=>{
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess())
  } catch (error) {
    dispatch(logoutFilure())
  }
}



export const login = async(dispatch,user)=>{
 dispatch(loginStart());
 
 try {
  const res = await publicRequest.post('/auth/login',user);
  dispatch(loginSuccess(res.data))
 } catch (error) {
  dispatch(loginFilure())
 }
}

export const logout = async(dispatch)=>{
 dispatch(logoutStart());
 
 try {
  dispatch(logoutSuccess())
 } catch (error) {
  dispatch(logoutFilure())
 }
}


export const getProducts = async(dispatch)=>{
  dispatch(getProductStart());
  
  try {
   const res = await publicRequest.get('/products');
   dispatch(getProductSuccess(res.data))
  } catch (error) {
   dispatch(getProductFilure())
  }
 }
 
 export const addProduct = async(dispatch,product)=>{
   dispatch(addProductStart())
 
   try {
     const res = userRequest.post(`/products`,product);
     dispatch(addProductSuccess(res.data))
   } catch (error) {
     dispatch(addProductFilure())
   }
 }
 
 export const updateProduct = async(dispatch,id,product)=>{
   dispatch(updateProductStart())
   try {
     dispatch(updateProductSuccess({id, product}))
   } catch (error) {
     dispatch(updateProductFilure())
   }
 }
 
 export const deleteProduct = async(dispatch,id)=>{
   dispatch(deleteProductStart())
 
   try {
     // Create a reference to the file to delete
     const storage = getStorage(app);
     const image = (await publicRequest.get(`/products/find/${id}`)).data.img;
     const desertRef = ref(storage, image);
 
     // Delete the file
     deleteObject(desertRef).then(() => {}).catch((error) => {});
     await userRequest.delete(`/products/${id}`);
     dispatch(deleteProductSuccess(id))
   } catch (error) {
     dispatch(deleteProductFilure())
   }
 }