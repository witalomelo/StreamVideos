import React, { useEffect, useRef } from "react";
import { getMovies } from "../../../services/api2";
import "./Row.css";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";

const imageHost = "https://image.tmdb.org/t/p/original/";

function Row({ title, path, isLarge }) {
  const [movies, setMovies] = React.useState([]);
  const [trailerUrl, setTrailerUrl] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const rowRef = useRef(null);

  const handleOnClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.title || movie.name || movie.original_name || "")
        .then((url) => {
          setTrailerUrl(url);
        })
        .catch((error) => {
          console.log("Error fetching movie trailer", error);
        });
    }
  };

  const fetchMovies = async (_path) => {
    try {
      const data = await getMovies(_path);
      setMovies(data?.results);
    } catch (error) {
      console.log("fetchMovies error: ", error);
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path]);

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      scrollRow("left");
    }
  };

  const handleNextClick = () => {
    if (currentIndex < movies.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      scrollRow("right");
    }
  };

  const scrollRow = (direction) => {
    const row = rowRef.current;
    const cardWidth = row.querySelector(".movie-card").clientWidth;
    const scrollDistance = cardWidth * (direction === "left" ? -1 : 1);
    row.scrollBy({
      left: scrollDistance,
      behavior: "smooth",
    });
  };

  return (
    <div className="row-container">
      <h2 className="row-header">{title}</h2>
      <div className="row-cards" ref={rowRef}>
        {movies?.map((movie, index) => (
          <img
            className={`movie-card ${isLarge && "movie-card-large"}`}
            onClick={() => handleOnClick(movie)}
            key={movie.id}
            src={`${imageHost}${
              isLarge ? movie.backdrop_path : movie.poster_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      <div className="row-navigation">
        <button onClick={handlePrevClick}>&#60;</button>
        <button onClick={handleNextClick}>&#62;</button>
      </div>
      {trailerUrl && <ReactPlayer url={trailerUrl} playing={true} />}
    </div>
  );
}

export default Row;
