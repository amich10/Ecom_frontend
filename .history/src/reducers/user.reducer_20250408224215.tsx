import { createSlice } from "@reduxjs/toolkit";


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