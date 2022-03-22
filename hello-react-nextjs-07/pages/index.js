import Seo from "../components/Seo";
import {useEffect, useState} from "react";

const API_KEY = "fd1fa0908b59576b284dea0950747eec";

export default function Home() {
    const [movies, setMovies] = useState();
    const getMovies = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        const json = await response.json();
        console.log(json);
        setMovies(json.results);
    }
    useEffect(() => {
        getMovies();
    }, []);
    return (
        <div>
            <Seo title="Home"/>
            {!movies && <h4>Loading...</h4>}
            {movies?.map((movie) => (
                <div key={movie.id}>
                    <h4>{movie.original_title}</h4>
                </div>
            ))}
        </div>
    );
}
