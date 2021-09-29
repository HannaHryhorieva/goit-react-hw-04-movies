import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { fetchMovieActors } from '../apiServices/apiServices';

export default function Cast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetchMovieActors(movieId).then(respons => {
      setActors(respons.cast);
    });
  }, [movieId]);

  return (
    <div>
      {actors && (
        <ul className="actor-list">
          {actors.map(actor => (
            <li key={actor.cast_id}>
              {actor.profile_path && (
                <div className="actor-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                  />
                </div>
              )}

              <p className="actor-description">{actor.name}</p>
              <p className="actor-description">Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
