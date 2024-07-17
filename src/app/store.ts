import {configureStore} from '@reduxjs/toolkit';
import {MovieReducer} from "../containers/FetchSlice/FetchSlice.ts";


export const store = configureStore({
    reducer: {
        movie: MovieReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;