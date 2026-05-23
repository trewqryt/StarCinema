import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import './FavoritesPage.css'

const FavoritesPage = () => {
  const { movies, favorites } = useSelector((state) => state.movies)
  const favoriteMovies = movies.filter(movie => favorites.includes(movie.id))

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="page-header">
          <h1>⭐ Избранные фильмы</h1>
          <p>{favoriteMovies.length} фильмов в избранном</p>
        </div>

        {favoriteMovies.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-icon">🎬</div>
            <h3>У вас пока нет избранных фильмов</h3>
            <p>Добавляйте фильмы в избранное, чтобы не потерять их</p>
            <Link to="/movies" className="empty-btn">Перейти к фильмам</Link>
          </div>
        ) : (
          <div className="movies-grid">
            {favoriteMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage