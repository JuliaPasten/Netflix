import { useEffect, useState } from "react";
import { IMovieResponse, getTopRated, getUpcoming } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const Upcoming: React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMovies, setErrorMovies] = useState<boolean>(false);

    const getUp = async () => {
        await getUpcoming()
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data, "res");
                    setMovies(res.data.results);
                }
            })
            .catch((err) => {
                console.log(err, "err");
            });
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        getUp();
    }, []);

    return (
        <div>
             <div className='block pl-7'>
            {loading && <div> Loading... </div>}
            {errorMovies && <div> Error... </div>}
            <div className='table max-w-[100%]'>
                {movies.map((movie, index) => (
                    <MovieCard
                        key={movie.id}
                        movieId={movie.id}
                        posterPath={movie.poster_path}
                        title={movie.title}
                        voteAverage={movie.vote_average}
                        genreId={movie.genre_ids[0]}
                    />
                ))}
            </div>
        </div>
        </div>
    );
};

export default Upcoming;