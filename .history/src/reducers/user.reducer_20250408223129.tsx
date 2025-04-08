import { createSlice } from "@reduxjs/toolkit";


const UserSlicer = createSlice({
    name:"user",
    initialState:{},
    reducers:{
        sayHello:(state,action) =>{  //action(optional)
            console.log(state);
            console.log(action)
        }
    }
})

export const {sayHello}=UserSlicer.actions; //action stores all the functions from above reducers

export default UserSlicer.reducer