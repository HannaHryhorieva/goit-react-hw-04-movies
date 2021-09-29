import './App.css';
import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from './components/Container/Container';
import SiteBar from './components/SiteBar/SiteBar';

const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "home-page" */),
);

const MoviesPage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "movies-page" */),
);
function App() {
  return (
    <Container>
      <SiteBar />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route>
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
