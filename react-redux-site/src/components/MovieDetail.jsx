import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  addRating, 
  removeRating,
  selectMovieRatings,
  selectAverageRating,
  selectRatingsCount,
  selectMovieLikes,
  selectIsFavorite,
  toggleLike,
  toggleFavorite
} from '../features/movies/movieSlice'
import '../styles/movieDetail.css'

const MovieDetail = ({ movie, onClose }) => {
  const dispatch = useDispatch()
  const [selectedRating, setSelectedRating] = useState(0)
  const [showRatingButtons, setShowRatingButtons] = useState(false)
  
  // Получаем данные из Redux
  const ratings = useSelector(state => selectMovieRatings(state, movie.id))
  const avgRating = useSelector(state => selectAverageRating(state, movie.id))
  const ratingsCount = useSelector(state => selectRatingsCount(state, movie.id))
  const isLiked = useSelector(state => selectMovieLikes(state, movie.id))
  const isFav = useSelector(state => selectIsFavorite(state, movie.id))

  const handleAddRating = (rating) => {
    dispatch(addRating({ movieId: movie.id, rating }))
    setSelectedRating(rating)
    setShowRatingButtons(false)
  }

  const handleRemoveRating = (index) => {
    dispatch(removeRating({ movieId: movie.id, ratingIndex: index }))
  }

  const handleLike = () => {
    dispatch(toggleLike(movie.id))
  }

  const handleFavorite = () => {
    dispatch(toggleFavorite(movie.id))
  }

  return (
    <div className="movie-detail">
      <button className="close-button" onClick={onClose}>×</button>
      
      <div className="detail-header">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="detail-poster"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://via.placeholder.com/200x300?text=${movie.title.charAt(0)}`
          }}
        />
        <div className="detail-title-section">
          <h2 className="detail-title">{movie.title}</h2>
          <p className="detail-year">{movie.year}</p>
          
          {/* Оценки */}
          <div className="detail-rating-section">
            <span className="detail-rating">⭐ {movie.rating}</span>
            {avgRating > 0 && (
              <span className="user-avg-rating">
                👥 {ratingsCount} оценок | ⭐ {avgRating}
              </span>
            )}
          </div>

          {/* Кнопки действий */}
          <div className="detail-actions-top">
            <button 
              className={`detail-like-btn ${isLiked ? 'active' : ''}`}
              onClick={handleLike}
            >
              {isLiked ? '❤️ Лайк' : '🤍 Лайк'}
            </button>
            <button 
              className={`detail-fav-btn ${isFav ? 'active' : ''}`}
              onClick={handleFavorite}
            >
              {isFav ? '⭐ В избранном' : '☆ В избранное'}
            </button>
          </div>
        </div>
      </div>

      <div className="detail-info">
        <div className="info-row">
          <span className="info-label">Жанр</span>
          <span className="info-value">{movie.genre}</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Режиссер</span>
          <span className="info-value">{movie.director}</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">В ролях</span>
          <span className="info-value">{movie.actors}</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Длительность</span>
          <span className="info-value">{movie.runtime}</span>
        </div>

        {/* Секция оценок пользователей */}
        <div className="info-row ratings-section">
          <span className="info-label">Оценки зрителей</span>
          <div className="ratings-container">
            <button 
              className="rate-button"
              onClick={() => setShowRatingButtons(!showRatingButtons)}
            >
              {showRatingButtons ? '✖️ Закрыть' : '🎯 Оценить фильм'}
            </button>
            
            {showRatingButtons && (
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating => (
                  <button
                    key={rating}
                    className={`rating-number ${selectedRating === rating ? 'selected' : ''}`}
                    onClick={() => handleAddRating(rating)}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            )}

            {/* Список всех оценок */}
            {ratings.length > 0 && (
              <div className="ratings-list">
                <h4>Все оценки ({ratings.length}):</h4>
                <div className="ratings-items">
                  {ratings.map((rating, index) => (
                    <div key={index} className="rating-item">
                      <span className="rating-value">⭐ {rating}</span>
                      <button 
                        className="remove-rating"
                        onClick={() => handleRemoveRating(index)}
                        title="Удалить оценку"
                      >
                        ✖️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="info-row description">
          <span className="info-label">О фильме</span>
          <p className="info-value">{movie.description}</p>
        </div>
      </div>

      <div className="detail-actions">
        <button className="buy-ticket-btn">Купить билет</button>
        <button className="trailer-btn">Трейлер</button>
      </div>
    </div>
  )
}

export default MovieDetail