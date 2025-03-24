import { configureStore } from "@reduxjs/toolkit";
import {searchApi} from "./searchApi"


const store = configureStore({
    reducer: {
        searchApi : searchApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchApi.middleware),    
    
});

export type RootState = ReturnType<typeof store.getState>;

export default store;