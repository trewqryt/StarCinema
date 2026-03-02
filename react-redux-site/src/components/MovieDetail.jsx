import React from 'react'
import '../styles/movieDetail.css'

const MovieDetail = ({ movie, onClose }) => {
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
          <span className="detail-rating">⭐ {movie.rating}</span>
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