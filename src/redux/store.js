import { configureStore } from "@reduxjs/toolkit";
import { dataSlice } from "./ApiSlce";
import { newsSlice } from "./NewsApiSlice";
import { setupListeners } from '@reduxjs/toolkit/query'

export const store=configureStore({
    reducer:{
        [dataSlice.reducerPath]:dataSlice.reducer   ,
        [newsSlice.reducerPath]:newsSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataSlice.middleware)
    
})
setupListeners(store.dispatch)