import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchMovies } from '../redux/slices/moviesSlice'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'

const HomePage = () => {
  const dispatch = useDispatch()
  const { movies, loading, error } = useSelector((state) => state.movies)
  const { searchQuery } = useSelector((state) => state.ui)

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchMovies())
    }
  }, [dispatch, movies.length])

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const featuredMovies = filteredMovies.slice(0, 6)

  if (loading && movies.length === 0) return <LoadingSpinner />
  if (error) return <div className="error-state">❌ {error}</div>

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Добро пожаловать в CINEMAHUB</h1>
          <p>Тысячи фильмов, удобные залы, незабываемая атмосфера</p>
          <Link to="/movies" className="hero-btn">Смотреть фильмы</Link>
        </div>
      </section>

      <section className="featured">
        <div className="container">
          <h2>Популярные фильмы</h2>
          <div className="movies-grid">
            {featuredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎬</div>
              <h3>Новинки кино</h3>
              <p>Все премьеры в день выхода</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍿</div>
              <h3>Комфорт</h3>
              <p>Удобные кресла и вкусный попкорн</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎫</div>
              <h3>Акции</h3>
              <p>Скидки и специальные предложения</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Удобство</h3>
              <p>Быстрый онлайн-заказ билетов</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage