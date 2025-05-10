import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatSvc from "../services/chat.service";

type IGetAllDataWithFilter ={
    page?:number,
    limit

}

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers", // action.type
    async(query) =>{
        try {
            //api call
            const users = await chatSvc.getRequest('/user',{
                params:{
                    search:query?.search || null,
                    page:query?.page || 1,
                    limit:query?.limit || 20
                }
            })
            
        } catch (exception) {
            throw exception
        }
    }

)  //reducer function inside slice cannot be made async and are always sync. so to handle async state we use thunk.

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