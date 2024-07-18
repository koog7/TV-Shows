import React from "react";
import {NavLink} from "react-router-dom";

interface Movie {
    id: number;
    name: string;
}

interface Props {
    movies: Movie[];
}


const AutocompleteBlock: React.FC<Props> = ({movies }) => {
    return (
        <div>
            <div>
                {movies && movies.map((movie) => (
                    <div key={movie.id}>
                        <NavLink className={'movie-name'} to={`/shows/id`}>{movie.name}</NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AutocompleteBlock;