import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { fetchTrendingMovies } from '../apiServices/apiServices';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  // const { url } = useRouteMatch();
  useEffect(() => {
    if (movies.length !== 0) {
      return;
    }
    fetchTrendingMovies().then(respons => {
      setMovies(respons.results);
    });
  });

  return (
    <div>
      {movies && (
        <ul className="movie-list">
          {movies.map(movie => (
            <li key={movie.id} className="list-item">
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  className="movie-poster"
                />

                <h4 className="list-title">{movie.original_title}</h4>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
