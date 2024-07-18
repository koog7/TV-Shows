import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axios/AxiosAPI.ts";

interface Movie{
    id: number;
    name: string;
}
interface MovieData {
    id: number;
    name: string;
    language: string;
    premiered: string;
    averageRuntime: number;
    image: string;
    summary: string;
}
interface MovieState {
    movies: Movie[];
    moviesAllData: MovieData[]
    loading: boolean;
    error: boolean;
}
const initialState: MovieState = {
    movies: [],
    moviesAllData: [],
    loading: false,
    error: false,
};
export const getMovie = createAsyncThunk<Movie[], string, { state: RootState }>('todos/fetchMovies', async (word) => {
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

export const getAllDataMovie = createAsyncThunk<MovieData, string, { state: RootState }>('todos/fetchMoviesData', async (id:string) => {
    try{
        const response = await axiosAPI.get<MovieData>(`http://api.tvmaze.com/shows/${id}`);
        const data = response.data;

        return {
            id: data.id,
            name: data.name || 'No name available',
            language: data.language || 'Unknown',
            premiered: data.premiered || 'Unknown',
            averageRuntime: data.averageRuntime || 0,
            image: data.image ? data.image.medium : 'https://via.placeholder.com/210x295?text=No+Image',
            summary: data.summary || 'No summary available',
        };
    }catch (error) {
        console.error('Error:', error);
    }
});


export const MovieSlice = createSlice({
    name:'movie',
    initialState,
    reducers:{
        clearState: (state) => {
            state.movies = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMovie.pending, (state: MovieState) => {
            state.loading = true;
            state.error = false;
        }).addCase(getMovie.fulfilled, (state: MovieState, action: PayloadAction<Movie[]>) => {
            state.loading = false;
            state.movies = action.payload;
        }).addCase(getMovie.rejected, (state: MovieState) => {
            state.loading = false;
            state.error = true;
        }).addCase(getAllDataMovie.pending, (state: MovieState) => {
            state.loading = true;
            state.error = false;
        }).addCase(getAllDataMovie.fulfilled, (state: MovieState, action: PayloadAction<MovieData>) => {
            state.loading = false;
            state.moviesAllData = [action.payload];
        }).addCase(getAllDataMovie.rejected, (state: MovieState) => {
            state.loading = false;
            state.error = true;
        });
    },
})

export const MovieReducer = MovieSlice.reducer;
export const  {clearState}  = MovieSlice.actions;