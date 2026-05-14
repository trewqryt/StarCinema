import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieById, addRating, removeRating, toggleLike, toggleFavorite } from '../redux/slices/moviesSlice'
import LoadingSpinner from '../components/LoadingSpinner'

const MovieDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentMovie, loading, error } = useSelector((state) => state.movies)
  const [ratingValue, setRatingValue] = useState(0)
  const [showRatingInput, setShowRatingInput] = useState(false)

  const isLiked = useSelector((state) => state.movies.likes[currentMovie?.id] || false)
  const isFav = useSelector((state) => state.movies.favorites.includes(currentMovie?.id))
  const ratings = useSelector((state) => state.movies.ratings[currentMovie?.id] || [])
  
  const avgRating = ratings.length > 0 
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : 0

  useEffect(() => {
    dispatch(fetchMovieById(id))
  }, [dispatch, id])

  const handleAddRating = () => {
    if (ratingValue >= 1 && ratingValue <= 10) {
      dispatch(addRating({ movieId: currentMovie.id, rating: ratingValue }))
      setRatingValue(0)
      setShowRatingInput(false)
    }
  }

  const handleRemoveRating = (index) => {
    dispatch(removeRating({ movieId: currentMovie.id, index }))
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="error-state">❌ {error}</div>
  if (!currentMovie) return null

  return (
    <div className="movie-detail-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>← Назад</button>
        
        <div className="movie-detail-content">
          <div className="detail-poster">
            <img src={currentMovie.poster} alt={currentMovie.title} />
            <div className="detail-actions">
              <button 
                className={`action-btn ${isLiked ? 'active' : ''}`}
                onClick={() => dispatch(toggleLike(currentMovie.id))}
              >
                {isLiked ? '❤️ Лайк' : '🤍 Лайк'}
              </button>
              <button 
                className={`action-btn ${isFav ? 'active' : ''}`}
                onClick={() => dispatch(toggleFavorite(currentMovie.id))}
              >
                {isFav ? '⭐ В избранном' : '☆ В избранное'}
              </button>
            </div>
          </div>
          
          <div className="detail-info">
            <h1>{currentMovie.title}</h1>
            <div className="detail-meta">
              <span className="year">📅 {currentMovie.year}</span>
              <span className="rating">⭐ {currentMovie.rating}</span>
              {avgRating > 0 && (
                <span className="user-rating">👥 {ratings.length} оценок, средняя: {avgRating}</span>
              )}
              <span className="runtime">⏱️ {currentMovie.runtime}</span>
            </div>
            
            <div className="detail-section">
              <h3>Режиссер</h3>
              <p>{currentMovie.director}</p>
            </div>
            
            <div className="detail-section">
              <h3>В ролях</h3>
              <p>{currentMovie.actors}</p>
            </div>
            
            <div className="detail-section">
              <h3>О фильме</h3>
              <p>{currentMovie.description}</p>
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
                  🎯 Оценить фильм
                </button>
              )}
              
              {ratings.length > 0 && (
                <div className="ratings-list">
                  <h4>Все оценки:</h4>
                  <div className="ratings-items">
                    {ratings.map((rating, index) => (
                      <div key={index} className="rating-item">
                        <span>⭐ {rating}</span>
                        <button onClick={() => handleRemoveRating(index)}>✖️</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button className="buy-ticket-btn">🎫 Купить билет</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage