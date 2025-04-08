import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatSvc from "../services/chat.service";

type IGetAllDataWithFilter ={
    page?:number,
    limit?:number,
    search?:string | null

}

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers", // action.type
    async(query:IGetAllDataWithFilter) =>{
        try {
            //api call
            const users = await chatSvc.getRequest('/users',{
                params:{
                    search:query?.search || null,
                    page:query?.page || 1,
                    limit:query?.limit || 20
                }
            })
            // console.log(users)
            return users;
            
        } catch (exception) {
            console.log(exception)
            throw exception
        }
    }

)  //reducer function inside slice cannot be made async and are always sync. so to handle async state we use thunk.

const UserSlicer = createSlice({
    name:"user",
    initialState:{
        userDetail:{},
        userList:null,
        userPagination:{
            limit:20,
            page:1,
            total:0,
            totalPages:1
        }
    },
    reducers:{
        sayHello:(state,action) =>{  //action(optional) = action.payload
            state.userDetail = action.payload
            // console.log(state);
            // console.log(action)
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(getAllUsers.fulfilled,(state,action) =>{
            console.log
        })
    }
})

export const {sayHello}=UserSlicer.actions; //action stores all the functions from above reducers

export default UserSlicer.reducer