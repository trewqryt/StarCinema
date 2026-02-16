import React from 'react'
import '../styles/movieDetail.css'

const MovieDetail = ({ movie, onClose }) => {
  return (
    <div className="movie-detail">
      <button className="close-button" onClick={onClose}>×</button>
      
      <div className="detail-header">
        <img 
          src={movie.poster || `https://via.placeholder.com/200x300?text=${movie.title.charAt(0)}`} 
          alt={movie.title}
          className="detail-poster"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://via.placeholder.com/200x300?text=${movie.title.charAt(0)}`
          }}
        />
        <div className="detail-title-section">
          <h2 className="detail-title">{movie.title}</h2>
          <p className="detail-year">{movie.year || '2024'}</p>
        </div>
      </div>

      <div className="detail-info">
        <div className="info-row">
          <span className="info-label">Рейтинг:</span>
          <span className="info-value">⭐ {movie.rating || 'N/A'}</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Жанр:</span>
          <span className="info-value">{movie.genre || 'Не указан'}</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Режиссер:</span>
          <span className="info-value">{movie.director || 'Информация отсутствует'}</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">В ролях:</span>
          <span className="info-value">{movie.actors || 'Информация отсутствует'}</span>
        </div>
        
        <div className="info-row description">
          <span className="info-label">Описание:</span>
          <p className="info-value">{movie.description || movie.plot || 'Описание отсутствует'}</p>
        </div>
        
        <div className="info-row">
          <span className="info-label">Длительность:</span>
          <span className="info-value">{movie.runtime || 'N/A'}</span>
        </div>
      </div>

      <button className="buy-ticket-btn">Купить билет</button>
    </div>
  )
}

export default MovieDetail