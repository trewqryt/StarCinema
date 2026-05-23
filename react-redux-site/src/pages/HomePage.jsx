import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchMovies } from '../redux/slices/moviesSlice'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'
import './HomePage.css'

const HomePage = () => {
  const dispatch = useDispatch()
  const { movies, loading, error } = useSelector((state) => state.movies)

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchMovies())
    }
  }, [dispatch, movies.length])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="error-state">❌ Ошибка: {error}</div>

  const featuredMovies = movies.slice(0, 6)

  return (
    <div className="home-page">
      {/* Hero секция */}
      <section className="hero">
        <div className="hero-content">
          <h1>Добро пожаловать в <span>STARCINEMA</span></h1>
          <p>Лучшие фильмы, удобные кресла, незабываемая атмосфера</p>
          <Link to="/movies" className="hero-btn">🎬 Смотреть фильмы</Link>
        </div>
      </section>

      {/* Популярные фильмы */}
      <section className="featured">
        <div className="container">
          <h2>Популярные фильмы</h2>
          {featuredMovies.length === 0 ? (
            <div className="empty-state">Фильмы не найдены</div>
          ) : (
            <div className="movies-grid">
              {featuredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage