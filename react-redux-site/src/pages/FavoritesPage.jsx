import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectIsFavorite } from '../features/movies/movieSlice'

const FavoritesPage = () => {
  const { movies, favorites } = useSelector((state) => state.movies)
  const favoriteMovies = movies.filter(movie => favorites.includes(movie.id))

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#4fc3f7', marginBottom: '2rem' }}>
          ⭐ Мои избранные фильмы
        </h1>
        
        {favoriteMovies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: '#1e293b', borderRadius: '20px' }}>
            <p style={{ fontSize: '1.5rem', color: '#94a3b8' }}>😕 У вас пока нет избранных фильмов</p>
            <Link to="/" style={{ color: '#4fc3f7', textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
              Перейти к фильмам →
            </Link>
          </div>
        ) : (
          <div className="movies-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {favoriteMovies.map(movie => (
              <Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#1e293b', borderRadius: '12px', overflow: 'hidden', transition: 'transform 0.3s' }}>
                  <img src={movie.poster} alt={movie.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ color: '#4fc3f7', marginBottom: '0.5rem' }}>{movie.title}</h3>
                    <p style={{ color: '#94a3b8' }}>{movie.year} • ⭐ {movie.rating}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage