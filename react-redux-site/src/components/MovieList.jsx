import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  setMovies, 
  setLoading, 
  setError, 
  setCurrentMovie,
  toggleLike,
  toggleFavorite,
  selectMovieLikes,
  selectIsFavorite,
  selectAverageRating,
  selectRatingsCount
} from '../features/movies/movieSlice'
import MovieDetail from './MovieDetail'
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
        await delay(1000)
        
        const savedMovies = localStorage.getItem('movies')
        if (savedMovies) {
          dispatch(setMovies(JSON.parse(savedMovies)))
        } else {
          const defaultMovies = [
            {
              id: 1,
              title: "Дюна: Часть вторая",
              year: 2024,
              rating: 8.9,
              genre: "Фантастика, Боевик",
              director: "Дени Вильнёв",
              actors: "Тимоти Шаламе, Зендея",
              description: "Пол Атрейдес объединяется с фрименами, чтобы отомстить заговорщикам.",
              poster: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
              runtime: "2ч 46мин"
            },
            {
              id: 2,
              title: "Оппенгеймер",
              year: 2023,
              rating: 8.5,
              genre: "Драма, Биография",
              director: "Кристофер Нолан",
              actors: "Киллиан Мёрфи, Эмили Блант",
              description: "История жизни создателя атомной бомбы.",
              poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
              runtime: "3ч"
            }
          ]
          dispatch(setMovies(defaultMovies))
          localStorage.setItem('movies', JSON.stringify(defaultMovies))
        }
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

  const handleLike = (e, movieId) => {
    e.stopPropagation()
    dispatch(toggleLike(movieId))
  }

  const handleFavorite = (e, movieId) => {
    e.stopPropagation()
    dispatch(toggleFavorite(movieId))
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
          {movies.map((movie) => {
            const isLiked = useSelector(state => selectMovieLikes(state, movie.id))
            const isFav = useSelector(state => selectIsFavorite(state, movie.id))
            const avgRating = useSelector(state => selectAverageRating(state, movie.id))
            const ratingsCount = useSelector(state => selectRatingsCount(state, movie.id))
            
            return (
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
                  
                  {/* Средняя оценка от пользователей */}
                  {avgRating > 0 && (
                    <div className="user-rating">
                      <span className="user-rating-label">👥 {ratingsCount} оценок</span>
                      <span className="user-rating-value">⭐ {avgRating}</span>
                    </div>
                  )}

                  {/* Кнопки действий */}
                  <div className="movie-actions">
                    <button 
                      className={`action-btn like-btn ${isLiked ? 'active' : ''}`}
                      onClick={(e) => handleLike(e, movie.id)}
                      title={isLiked ? 'Убрать лайк' : 'Поставить лайк'}
                    >
                      {isLiked ? '❤️' : '🤍'} 
                      <span className="action-count">{isLiked ? '1' : '0'}</span>
                    </button>
                    
                    <button 
                      className={`action-btn fav-btn ${isFav ? 'active' : ''}`}
                      onClick={(e) => handleFavorite(e, movie.id)}
                      title={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
                    >
                      {isFav ? '⭐' : '☆'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {selectedMovie && (
          <MovieDetail movie={selectedMovie} onClose={handleCloseDetail} />
        )}
      </div>
    </div>
  )
}

export default MovieList