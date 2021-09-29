import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, NavLink, Route } from 'react-router-dom';

import { fetchMovieById } from '../apiServices/apiServices';

const Cast = lazy(() => import('./Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "reviews" */),
);
export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    fetchMovieById(movieId).then(respons => {
      setMovie(respons);
    });
  }, [movieId]);

  return (
    <div>
      {movie && (
        <div>
          <div>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
              />
            )}
          </div>
          <div>
            <h2>{movie.original_title}</h2>
            <p>{movie.popularity}</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h4>Genres</h4>
            {movie.genres.map(genre => {
              return <span key={genre.id}>{genre.name}</span>;
            })}
          </div>
          <NavLink
            to={`/movies/${movieId}/cast`}
            className="styles.link"
            activeClassName="styles.activeLink"
          >
            Cast
          </NavLink>
          <NavLink
            to={`/movies/${movieId}/reviews`}
            className="styles.link"
            activeClassName="styles.activeLink"
          >
            Reviews
          </NavLink>
        </div>
      )}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Route path="/movies/:movieId/cast">
          <Cast />
        </Route>
        <Route path="/movies/:movieId/reviews">
          <Reviews />
        </Route>
      </Suspense>
    </div>
  );
}
