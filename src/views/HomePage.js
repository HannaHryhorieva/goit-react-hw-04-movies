import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchTrendingMovies } from '../apiServices/apiServices';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
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
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
