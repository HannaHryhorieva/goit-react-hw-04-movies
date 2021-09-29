const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '14a722472d4c510b3277afa88fadf68d';

const handleFetch = function (url) {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Movie not found'));
  });
};

function fetchTrendingMovies() {
  return handleFetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
}

function fetchQueryMovies(query) {
  return handleFetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
  );
}

function fetchMovieById(movieId) {
  return handleFetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
}

function fetchMovieActors(movieId) {
  return handleFetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
}

function fetchMovieReviews(movieId) {
  return handleFetch(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );
}

export {
  fetchTrendingMovies,
  fetchQueryMovies,
  fetchMovieById,
  fetchMovieActors,
  fetchMovieReviews,
};
