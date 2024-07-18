import AutocompleteBlock from "../components/AutocompleteBlock.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import '../App.css'
import {useEffect, useState} from "react";
import {getMovie} from "./FetchSlice/FetchSlice.ts";
const Home = () => {

    const dispatch = useDispatch<AppDispatch>();
    const movies = useSelector((state: RootState) => state.movie.movies);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        console.log(searchText);
        dispatch(getMovie(searchText))
    }, [searchText]);

    return (
        <div>
            <div className={'search-block'}>
                <label>Search by name</label>
                <input placeholder={'Enter a name of tv show'} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
            </div>
            <div className={'autocomplete-block'}  style={{ display: movies.length > 0 ? 'block' : 'none' , maxHeight: '200px' , overflowY: 'auto', borderRadius: '5px'}}>
                <AutocompleteBlock movies={movies} />
            </div>
        </div>
    );
};

export default Home;