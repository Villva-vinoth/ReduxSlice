import { createSlice } from "@reduxjs/toolkit";


const initialState = []

const Userslice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload)
        },
        editUser : (state,action)=>{
            // console.log(state,action.payload.id)
            return state.map((item)=> item.id == action.payload.id ? action.payload : item)
        },
        deleteUser:(state,action)=>{
            return state.filter((item)=> item.id != action.payload.id )
        }
    }
})


export const { addUser,editUser,deleteUser } = Userslice.actions;
export default Userslice.reducer