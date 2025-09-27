import {configureStore} from "@reduxjs/toolkit"
import movieReducer from "./movieReducer"

export const store = configureStore({
    reducer:{
        // Child reducer
        movieReducer,
    }
})