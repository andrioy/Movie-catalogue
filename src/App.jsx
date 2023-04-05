import { useState } from "react";
import SearchIcon from "./assets/search.svg";
import "./App.css";
import MovieCard from "./componenets/MovieCard/MovieCart";

function App() {
  const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    await fetch(`${API_URL}&s=${title}`)
      .then((response) => response.json())
      .then((json) => setMovies(json.Search));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchMovies(search);
    }
  };

  return (
    <div className="App">
      <h1>Movie Catalogue</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(search);
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
