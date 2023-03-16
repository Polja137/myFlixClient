import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Tenet",
      image:
      "https://www.imdb.com/title/tt6723592/mediaviewer/rm3840584961/?ref_=tt_ov_i",
      year:2020
    },
    {
      id: 2,
      title: "Intrestellar",
      image:
        "https://images.app.goo.gl/eQZjsXZKcL4YW5xq5",
      year: 2014
    },
    {
      id: 3,
      title: "Dunkirk",
      image:
        "https://images.app.goo.gl/nJYPHXyzbDDhhJSq6",
      year: 2004
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
