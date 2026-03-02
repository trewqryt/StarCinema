import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMovies, setLoading, setError, setCurrentMovie } from '../features/movies/movieSlice'
import MovieDetail from './MovieDetail'
import moviesData from '../data/movies.json'
import '../styles/movieList.css'

const MovieList = () => {
  const dispatch = useDispatch()
  const { movies, loading, error } = useSelector((state) => state.movies)
  
  const [selectedMovie, setSelectedMovie] = useState(null)

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        dispatch(setLoading(true))
        await delay(1500)
        dispatch(setMovies(moviesData.movies))
        dispatch(setError(null))
      } catch (err) {
        dispatch(setError(err.message))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchMovies()
  }, [dispatch])

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
    dispatch(setCurrentMovie(movie))
  }

  const handleCloseDetail = () => {
    setSelectedMovie(null)
    dispatch(setCurrentMovie(null))
  }

  if (loading) {
    return (
      <div className="movie-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Загрузка фильмов...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="movie-list-container">
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Попробовать снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="movie-list-container">
      <h2 className="section-title">
        <span className="title-accent">Сейчас</span> в прокате
      </h2>
      
      <div className="movie-content">
        <div className={`movies-list ${selectedMovie ? 'with-detail' : ''}`}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className={`movie-card ${selectedMovie?.id === movie.id ? 'selected' : ''}`}
              onClick={() => handleMovieClick(movie)}
            >
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="movie-poster"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = `https://via.placeholder.com/80x120?text=${movie.title.charAt(0)}`
                }}
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-year">{movie.year}</p>
                <div className="movie-meta">
                  <span className="movie-rating">⭐ {movie.rating}</span>
                  <span className="movie-genre">{movie.genre.split(',')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedMovie && (
          <MovieDetail movie={selectedMovie} onClose={handleCloseDetail} />
        )}
      </div>
    </div>
  )
}

export default MovieList