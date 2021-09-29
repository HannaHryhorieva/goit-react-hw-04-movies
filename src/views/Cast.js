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
        <ul>
          {actors.map(actor => (
            <li key={actor.cast_id}>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                />
              )}

              <p>{actor.name}</p>
              <p>Character:{actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}