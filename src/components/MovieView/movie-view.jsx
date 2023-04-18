import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {


  const { movieId } = useParams();

  const book = movies.find((b) => b.id === movieId);

    return (
      <div>
        <div>
          <img src={movie.ImagePath} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>

        <Link to={`/`}>
        <button className="back-button">Back</button>
        </Link>
  
      
      </div>
    );
  };
  