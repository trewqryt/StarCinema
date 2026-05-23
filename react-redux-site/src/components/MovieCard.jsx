import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleFavorite, toggleLike } from '../redux/slices/moviesSlice'
import './MovieCard.css'

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch()
  const isFavorite = useSelector(state => state.movies.favorites.includes(movie.id))
  const isLiked = useSelector(state => state.movies.likes[movie.id] || false)

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <div className="movie-poster-wrapper">
          <img src={movie.poster} alt={movie.title} className="movie-poster" />
          <div className="movie-overlay">
            <button 
              className={`movie-overlay-btn ${isLiked ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                dispatch(toggleLike(movie.id))
              }}
              title={isLiked ? 'Убрать лайк' : 'Лайк'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span>{isLiked ? 'Liked' : 'Like'}</span>
            </button>
            <button 
              className={`movie-overlay-btn ${isFavorite ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                dispatch(toggleFavorite(movie.id))
              }}
              title={isFavorite ? 'Удалить из избранного' : 'В избранное'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span>{isFavorite ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </Link>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{movie.year}</span>
          <span className="movie-rating">⭐ {movie.rating}</span>
          <span className="movie-genre">{movie.genre?.split(',')[0]}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard