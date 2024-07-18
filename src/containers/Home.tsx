import AutocompleteBlock from "../components/AutocompleteBlock.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import '../App.css'
import {useEffect, useState} from "react";
import {getAllDataMovie, getMovie, setError} from "./FetchSlice/FetchSlice.ts";
import {useParams} from "react-router-dom";


const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const movies = useSelector((state: RootState) => state.movie.movies);
    const loader = useSelector((state :RootState) => state.movie.loader)
    const error = useSelector((state :RootState) => state.movie.error)
    const [searchText, setSearchText] = useState('');
    const {id} = useParams();
    const moviesAllData = useSelector((state: RootState) => state.movie.moviesAllData);

    useEffect(() => {
        try{
            dispatch(getMovie(searchText));
            dispatch(setError(true));
        }catch (e) {
            console.error('Error fetching movie data:', error);
        }
        if(id){
            try {
                dispatch(getAllDataMovie(id))
            }catch (e) {
                console.error('Error fetching movie:', error);
                dispatch(setError(true));
            }
            
        }
    }, [id,searchText]);

    const movieBlock = (
        <div className="movie-page-container">
            {moviesAllData.length > 0 ? (
                <>
                    <div className="movie-image">
                        <img src={moviesAllData[0].image} alt={moviesAllData[0].name} />
                    </div>
                    <div className="movie-details">
                        <h1>{moviesAllData[0].name}</h1>
                        <p><strong>Language:</strong> {moviesAllData[0].language}</p>
                        <p><strong>Premiered:</strong> {moviesAllData[0].premiered}</p>
                        <p><strong>Average Runtime:</strong> {moviesAllData[0].averageRuntime} minutes</p>
                        <div dangerouslySetInnerHTML={{ __html: moviesAllData[0].summary }} />
                    </div>
                </>
            ) : (
                <div>No data available</div>
            )}
        </div>
    );

    return (
        <div>
            <div id="loader-container" style={{display: loader ? 'block' : 'none'}}>
                <div className="loader"></div>
            </div>
            <div className={'search-block'}>
                <label>Search by name</label>
                <input
                    placeholder={'Enter a name of tv show'}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            {error && <div className="error-message">Something happened wrong...</div>}
            <div className={'autocomplete-block'} style={{
                display: movies.length > 0 ? 'block' : 'none',
                maxHeight: '200px',
                overflowY: 'auto',
                borderRadius: '5px'
            }}>
                <AutocompleteBlock movies={movies}/>
            </div>
            <div style={{marginTop: '50px'}}>
                {id && movieBlock}
            </div>

        </div>
    );
};

export default Home;