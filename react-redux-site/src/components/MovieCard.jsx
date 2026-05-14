import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleLike, toggleFavorite } from '../redux/slices/moviesSlice'

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch()
  const isLiked = useSelector((state) => state.movies.likes[movie.id] || false)
  const isFav = useSelector((state) => state.movies.favorites.includes(movie.id))
  const avgRating = useSelector((state) => {
    const ratings = state.movies.ratings[movie.id] || []
    if (ratings.length === 0) return 0
    return (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
  })

  const handleLike = (e) => { e.preventDefault(); dispatch(toggleLike(movie.id)) }
  const handleFavorite = (e) => { e.preventDefault(); dispatch(toggleFavorite(movie.id)) }

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />
        <div className="movie-actions">
          <button className={`action-btn ${isLiked ? 'active' : ''}`} onClick={handleLike}>
            {isLiked ? '❤️' : '🤍'}
          </button>
          <button className={`action-btn ${isFav ? 'active' : ''}`} onClick={handleFavorite}>
            {isFav ? '⭐' : '☆'}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span className="year">{movie.year}</span>
          <span className="rating">⭐ {movie.rating}</span>
          {avgRating > 0 && <span className="user-rating">👥 {avgRating}</span>}
        </div>
        <p className="genre">{movie.genre}</p>
      </div>
    </Link>
  )
}

export default MovieCard