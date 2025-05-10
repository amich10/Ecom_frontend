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

export consy {function1}