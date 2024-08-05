import { configureStore } from "@reduxjs/toolkit";
import users from './slice/user'

const store = configureStore({
    reducer:{
        user:users
    },
    devTools:true,
})

export default store;