import {createSlice} from "@reduxjs/toolkit";

interface Movie{
    id: number;
    name: string;
}

interface MovieState {
    todos: Movie[];
    loading: boolean;
    error: boolean;
}
const initialState: MovieState = {
    todos: [],
    loading: false,
    error: false,
};

export const MovieSlice = createSlice({
    name:'movie',
    initialState,
    reducers:{
        updateTodo: (state) => {
            console.log(state)
        },
    }
})

export const MovieReducer = MovieSlice.reducer;
export const  {updateTodo}  = MovieSlice.actions;