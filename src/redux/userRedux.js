import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name:"user",
  initialState:{
    currentUser:null,
    isFetching:false,
    error:false
  },
  reducers:{
    loginStart:(state)=>{
      state.isFetching=true
    },
    loginSuccess:(state,action)=>{
      state.isFetching=false;
      state.currentUser=action.payload;
      state.error = false;
    },
    loginFilure:(state,action)=>{
      state.isFetching=false;
      state.error=true;
    },
    logoutStart:(state)=>{
      state.isFetching=true
    },
    logoutSuccess:(state)=>{
      state.isFetching=false;
      state.currentUser=null;
      state.error = false;
    },
    logoutFilure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
  }
});

export const {loginStart, loginSuccess, loginFilure, logoutStart,logoutSuccess,logoutFilure} = userSlice.actions;
export default userSlice.reducer;