import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import {NavigationBar} from "../NavigationBar/navigation-bar";
import { ProfileView } from "../ProfileView/profile-view";
import {Container, Row,Col, Button, Card, CardGroup} from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  //const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (token) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    fetch("https://radiant-woodland-98669.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
          console.log(response);
          return response.json();
        } 
        else {
          console.log(response);
          throw new Error('Invalid content type or response error');
        }
      })
      .then((movies) => {
        setMovies(movies);
      })
      .catch((error) => {console.error("Error fetching movies:", error);});
},[token]);

  const onLoggedOut = () => {
    setUser(null);
    localStorage.clear();
  }

  const updateUser = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }   

  return (
        <BrowserRouter>
        <NavigationBar user={user} onLoggedOut={onLoggedOut}/>
          <Row className="justify-content-md-center">
            <Routes>
              <Route path="/signup" element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <SignupView />
                      </Col>
                    )}
                  </>
    
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <LoginView onLoggedIn={(user, token) => { 
                          setUser(user);
                          setToken(token);
                         }} />
                      </Col>
                    )}
                  </>
    
                }
              />
              <Route
                path="/movies/:movieId"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <Col md={8}>
                        <MovieView movies={movies} user={user} token={token} updateUser={updateUser}/>
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    {!user ? (<Navigate to="/login" replace />)
                     : movies.length === 0 ? (<Col>The list is empty!</Col>
                    ) : (
                      <>
                        {movies.map((movie) => (
                          <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard
                            movie={movie}
                            />
                          </Col>
                        ))}
                      </>
                    )}
                  </>
                }
              />
                <Route
                path="/profile"
                element={
                  <>
                      <Col md={5}>
                        <ProfileView user={user} movies={movies} token={token} onLoggedOut={onLoggedOut} updateUser={updateUser}/>
                      </Col>

                  </>
                }
              />
            </Routes>
          </Row>
        </BrowserRouter>
);
};
