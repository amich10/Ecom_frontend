import { createSlice } from "@reduxjs/toolkit";


const UserSlicer = createSlice({
    name:"user",
    initialState:{},
    reducers:{
        function1:(state,action) =>{
            console.log(state);
            console.log(action)
        }
    }
})

export const {function1}=UserSlicer.actions; //action stores all the functions
export default UserSlicer.reducer