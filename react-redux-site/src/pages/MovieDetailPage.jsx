import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, toggleFavorite, toggleLike, addRating, removeRating } from '../redux/slices/moviesSlice'
import LoadingSpinner from '../components/LoadingSpinner'
import './MovieDetailPage.css'

const MovieDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { movies, loading, favorites, likes, ratings } = useSelector((state) => state.movies)
  const [ratingValue, setRatingValue] = useState(0)
  const [showRatingInput, setShowRatingInput] = useState(false)

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchMovies())
    }
  }, [dispatch, movies.length])

  const movie = movies.find(m => m.id === parseInt(id))
  const isFavorite = favorites.includes(parseInt(id))
  const isLiked = likes[parseInt(id)] || false
  const movieRatings = ratings[parseInt(id)] || []
  
  const avgRating = movieRatings.length > 0 
    ? (movieRatings.reduce((a, b) => a + b, 0) / movieRatings.length).toFixed(1)
    : 0

  const handleAddRating = () => {
    if (ratingValue >= 1 && ratingValue <= 10) {
      dispatch(addRating({ movieId: movie.id, rating: ratingValue }))
      setRatingValue(0)
      setShowRatingInput(false)
    }
  }

  const handleRemoveRating = (index) => {
    dispatch(removeRating({ movieId: movie.id, index }))
  }

  if (loading) return <LoadingSpinner />
  if (!movie) return <div className="error-state">❌ Фильм не найден</div>

  return (
    <div className="detail-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Назад
        </button>

        <div className="detail-content">
          <div className="detail-poster">
            <img src={movie.poster} alt={movie.title} />
          </div>

          <div className="detail-info">
            <h1>{movie.title}</h1>
            
            <div className="detail-meta">
              <span className="detail-year">📅 {movie.year}</span>
              <span className="detail-rating">⭐ {movie.rating}</span>
              {avgRating > 0 && (
                <span className="detail-user-rating">👥 {movieRatings.length} оценок, средняя: {avgRating}</span>
              )}
              <span className="detail-runtime">⏱️ {movie.runtime}</span>
            </div>

            <div className="detail-section">
              <h3>Режиссер</h3>
              <p>{movie.director}</p>
            </div>

            <div className="detail-section">
              <h3>В ролях</h3>
              <p>{movie.actors}</p>
            </div>

            <div className="detail-section">
              <h3>О фильме</h3>
              <p>{movie.description}</p>
            </div>

            <div className="detail-section">
              <h3>Оцените фильм</h3>
              {showRatingInput ? (
                <div className="rating-input">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    step="1"
                    value={ratingValue}
                    onChange={(e) => setRatingValue(parseInt(e.target.value))}
                    placeholder="Оценка от 1 до 10"
                  />
                  <button onClick={handleAddRating}>Отправить</button>
                  <button onClick={() => setShowRatingInput(false)}>Отмена</button>
                </div>
              ) : (
                <button className="rate-btn" onClick={() => setShowRatingInput(true)}>
                  Оценить фильм
                </button>
              )}

              {movieRatings.length > 0 && (
                <div className="ratings-list">
                  <h4>Ваши оценки:</h4>
                  <div className="ratings-items">
                    {movieRatings.map((rating, index) => (
                      <div key={index} className="rating-item">
                        <span>⭐ {rating}</span>
                        <button onClick={() => handleRemoveRating(index)}>✖</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="detail-actions">
              <button 
                className={`detail-btn ${isLiked ? 'active' : ''}`}
                onClick={() => dispatch(toggleLike(movie.id))}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "#e94560" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>

              <button 
                className={`detail-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => dispatch(toggleFavorite(movie.id))}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? "#ffd700" : "none"} stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </button>

              <button className="detail-btn buy-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                <span>Buy ticket</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage