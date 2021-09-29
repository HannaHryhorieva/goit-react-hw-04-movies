import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { fetchQueryMovies } from '../apiServices/apiServices';
// import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();

  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(() => {
    return new URLSearchParams(location.search).get('query') ?? '';
  });

  useEffect(() => {
    if (query === '') {
      return;
    }
    fetchQueryMovies(query)
      .then(respons => {
        setMovies(respons.results);
      })
      .finally(() => {
        setSearchValue('');
      });
  }, [query]);

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchValue.trim() === '') {
      return;
    }
    setQuery(searchValue.toLowerCase());
    history.push({ ...location, search: `query=${searchValue.toLowerCase()}` });
  };

  return (
    <div>
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className="SearchForm-input"
          value={searchValue}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
        />

        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
      </form>
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
