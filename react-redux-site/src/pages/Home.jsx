// src/pages/Home.jsx (вариант с карточками)
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const movies = useSelector((state) => state.movies.movies);
  const theme = useSelector((state) => state.ui.theme);

  return (
    <div className={`home ${theme}`}>
      <h2>Popular Movies</h2>
      
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            <p className="year-genre">
              {movie.year} • {movie.genre}
            </p>
            {/* Можно добавить описание, рейтинг и т.д. в будущем */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;