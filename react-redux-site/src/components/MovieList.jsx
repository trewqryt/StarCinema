import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMovies, setLoading, setError, setCurrentMovie } from '../features/movies/movieSlice'
import MovieDetail from './MovieDetail'
import '../styles/movieList.css'

const MovieList = () => {
  const dispatch = useDispatch()
  const { movies, loading, error, currentMovie } = useSelector((state) => state.movies)
  const theme = useSelector((state) => state.ui.theme)
  
  // Состояние для выбранного фильма (для LIST/DETAIL)
  const [selectedMovie, setSelectedMovie] = useState(null)

  // Функция для имитации задержки
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        dispatch(setLoading(true))
        
        // Имитируем задержку сети (2 секунды) [citation:3]
        await delay(2000)
        
        // Используем бесплатный JSON API с фейковыми данными о фильмах [citation:1][citation:6]
        const response = await fetch('https://www.aquascript.xyz/api/movies.json')
        
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных')
        }
        
        const data = await response.json()
        
        // AquaScript возвращает данные в формате { movies: [...] }
        // Добавляем уникальные ID если их нет
        const moviesWithIds = data.movies.map((movie, index) => ({
          ...movie,
          id: movie.id || index + 1
        }))
        
        dispatch(setMovies(moviesWithIds))
        dispatch(setError(null))
      } catch (err) {
        dispatch(setError(err.message))
        console.error('Ошибка при загрузке фильмов:', err)
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchMovies()
  }, [dispatch])

  // Обработчик клика по фильму (для LIST/DETAIL) [citation:5]
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
    dispatch(setCurrentMovie(movie))
  }

  // Обработчик закрытия детального просмотра
  const handleCloseDetail = () => {
    setSelectedMovie(null)
    dispatch(setCurrentMovie(null))
  }

  if (loading) {
    return (
      <div className={`movie-list-container ${theme}-theme`}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Загрузка фильмов... Пожалуйста, подождите</p>
          <p className="loading-note">(имитация задержки сети 2 секунды)</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`movie-list-container ${theme}-theme`}>
        <div className="error-message">
          <p>❌ Ошибка: {error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Попробовать снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`movie-list-container ${theme}-theme`}>
      <h2 className="section-title">Сейчас в прокате</h2>
      
      {/* LIST/DETAIL View [citation:5][citation:9] */}
      <div className="movie-content">
        {/* Левая колонка - список фильмов */}
        <div className={`movies-list ${selectedMovie ? 'with-detail' : ''}`}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className={`movie-card ${selectedMovie?.id === movie.id ? 'selected' : ''}`}
              onClick={() => handleMovieClick(movie)}
            >
              <img 
                src={movie.poster || `https://via.placeholder.com/80x120?text=${movie.title.charAt(0)}`} 
                alt={movie.title}
                className="movie-poster"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = `https://via.placeholder.com/80x120?text=${movie.title.charAt(0)}`
                }}
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-year">{movie.year || '2024'}</p>
                <div className="movie-meta">
                  <span className="movie-rating">⭐ {movie.rating || 'N/A'}</span>
                  <span className="movie-genre">{movie.genre || 'Не указан'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Правая колонка - детальная информация (условный рендеринг) [citation:5] */}
        {selectedMovie && (
          <MovieDetail movie={selectedMovie} onClose={handleCloseDetail} />
        )}
      </div>
    </div>
  )
}

export default MovieList