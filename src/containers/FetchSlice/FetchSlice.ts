import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axios/AxiosAPI.ts";

interface Movie{
    id: number;
    name: string;
}

interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: boolean;
}
const initialState: MovieState = {
    movies: [],
    loading: false,
    error: false,
};
export const getMovie = createAsyncThunk<Movie[], void, { state: RootState }>('todos/fetchTodos', async (word) => {
    try{
        const response = await axiosAPI.get<{ show: { id: number; name: string } }[]>(`http://api.tvmaze.com/search/shows?q=${word}`);
        return response.data.map(item => ({
            id: item.show.id,
            name: item.show.name
        }));
    }catch (error) {
        console.error('Error:', error);
    }
});

export const MovieSlice = createSlice({
    name:'movie',
    initialState,
    reducers:{
        updateTodo: (state) => {
            console.log(state)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMovie.pending, (state: MovieState) => {
            state.loading = true;
            state.error = false;
        }).addCase(getMovie.fulfilled, (state: MovieState, action: PayloadAction<Movie[]>) => {
            state.loading = false;
            state.movies = action.payload;
            console.log(state.movies)
        }).addCase(getMovie.rejected, (state: MovieState) => {
            state.loading = false;
            state.error = true;
        });
    },
})

export const MovieReducer = MovieSlice.reducer;
export const  {updateTodo}  = MovieSlice.actions;