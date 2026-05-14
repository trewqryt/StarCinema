import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'

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
          <div className="empty-state">
            <p>😕 У вас пока нет избранных фильмов</p>
            <Link to="/movies" className="btn-primary">Перейти к фильмам</Link>
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