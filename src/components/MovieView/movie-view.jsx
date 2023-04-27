import { useParams } from "react-router";
import { Button, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";
import { MainView } from "../MainView/main-view";
import PropTypes from "prop-types";
import './movie-view.scss';

export const MovieView = ({ movies, user, token, updateUser }) => {
  console.log("User", user);
  const { movieId } = useParams();
  //const [user, setUser]=useState([]);
  //const [username, setUsername] = useState(user.Username);
  const movie = movies.find((m) => m._id === movieId);
  const [isFavorite, setIsFavorite] = useState(false);  

  console.log("Movie in Movie View", movie);
  
  useEffect(()=>{
    setIsFavorite(user.FavoriteMovies.includes(movie._id))
  },[movieId])


  const addFavorite = () => {
    fetch(`https://radiant-woodland-98669.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Failed");
            return false;
        }
    })
    .then(user => {
        if (user) {
            alert("Successfully added to favorites");
            setIsFavorite(true);
            updateUser(user);
        }
    })
    .catch(e => {alert(e);});
}

const removeFavorite = () => {
    fetch(`https://radiant-woodland-98669.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Failed");
            return false;
        }
    })
    .then(user => {
        if (user) {
            alert("Successfully deleted from favorites");
            setIsFavorite(false);
            updateUser(user);
        }
    })
    .catch(e => {alert(e);});
}

    return (
      <>
            <Col md={12}>
                <div className="text-dark">
                    <img className="float-start me-3 mb-2" src={movie.ImagePath} alt="Movie Cover Image" />
                    <h2>{movie.Title}</h2>
                    <p>{movie.Description}</p>
                    <h5>Genre: </h5>
                    <p>{movie.Genre.Name}</p>
                    <h5>Director: </h5>
                    <p>{movie.Director.Name}</p>
                    <Link to={"/"}>
                        <Button variant="primary">Back</Button>
                    </Link>
                    {isFavorite ? 
                        <Button variant="danger" className="ms-2" onClick={removeFavorite}>Remove from favorites</Button>
                        : <Button variant="success" className="ms-2" onClick={addFavorite}>Add to favorites</Button>
                    }                   
                    <h3 className="mt-3 mb-3 text-light">Similar movies:</h3>
                </div>
            </Col> 
          
        </>
    );

  };


  MovieView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired)
};