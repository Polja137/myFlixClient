import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    /*fetch("https://radiant-woodland-98669.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const moviesFromApi = data.map((doc) => {
          return {
            title: doc.Title,
            author: doc.Director.Name
          };
        });
        console.log("Movies from API", moviesFromApi)
        setMovies(moviesFromApi);
      });*/

      fetch("https://radiant-woodland-98669.herokuapp.com/movies",{
        headers: { Authorization: `Bearer ${token}` }}).then((response) => {
    if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
      console.log(response);
      return response.json();
    } else {
      console.log(response);
      throw new Error('Invalid content type or response error');}
  }).then((data) => {
    console.log(data);
    const moviesFromApi = data.map((doc) => {
      return {
        title: doc.Title,
        author: doc.Director.Name};
    });
    console.log("Movies from API", moviesFromApi);
    setMovies(moviesFromApi);
  })
  .catch((error) => {
    console.error("Error fetching movies:", error);
  });
  }, [movies, setMovies]);
  
  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

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
      <button onClick={() => {setUser(null); }}>Logout</button>
    </div>
  );
};
