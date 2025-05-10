import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getAllUsers = createAsyncThunk()  //for 

const UserSlicer = createSlice({
    name:"user",
    initialState:{
        userDetail:{}
    },
    reducers:{
        sayHello:(state,action) =>{  //action(optional) = action.payload
            state.userDetail = action.payload
            // console.log(state);
            // console.log(action)
        }
    }
})

export const {sayHello}=UserSlicer.actions; //action stores all the functions from above reducers

export default UserSlicer.reducer