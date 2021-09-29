import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  NavLink,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';

import { fetchMovieById } from '../apiServices/apiServices';

const Cast = lazy(() => import('./Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [locState] = useState(() => {
    return location?.state?.from ?? '/';
  });

  useEffect(() => {
    fetchMovieById(movieId).then(respons => {
      setMovie(respons);
    });
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };
  return (
    <div>
      <button type="button" onClick={onGoBack} className="button-goback">
        Go back
      </button>
      {movie && (
        <div className="card-container">
          <div className="movie-card">
            <div className="movie-card-img">
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                />
              )}
            </div>
            <div className="movie-description">
              <h2>{movie.original_title}</h2>
              <p>{movie.popularity}</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h4>Genres</h4>
              {movie.genres.map(genre => {
                return (
                  <span key={genre.id} className="movie-genre">
                    {genre.name}
                  </span>
                );
              })}
            </div>
          </div>

          <NavLink
            to={{
              pathname: `/movies/${movieId}/cast`,
              state: { from: locState },
            }}
            className="link"
            activeClassName="active-link"
          >
            Cast
          </NavLink>
          <NavLink
            to={{
              pathname: `/movies/${movieId}/reviews`,
              state: { from: locState },
            }}
            className="link"
            activeClassName="active-link"
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
