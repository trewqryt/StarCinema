import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../redux/slices/moviesSlice'
import { setFilterGenre, setSortBy } from '../redux/slices/uiSlice'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'

const MoviesPage = () => {
  const dispatch = useDispatch()
  const { movies, loading, error } = useSelector(state => state.movies)
  const { searchQuery, filterGenre, sortBy } = useSelector(state => state.ui)

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchMovies())
    }
  }, [dispatch, movies.length])

  const genres = ['all', ...new Set(movies.map(m => m.genre))]

  let filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = filterGenre === 'all' || movie.genre === filterGenre
    return matchesSearch && matchesGenre
  })

  filteredMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating)
    if (sortBy === 'year') return b.year - a.year
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    return 0
  })

  if (loading) return <LoadingSpinner />
  if (error) return <div className="error-state">❌ Ошибка: {error}</div>

  return (
    <div className="movies-page">
      <div className="container">
        <div className="page-header">
          <h1>Все фильмы</h1>
          <p>Найдено: {filteredMovies.length} фильмов</p>
        </div>

        <div className="filters">
          <select value={filterGenre} onChange={(e) => dispatch(setFilterGenre(e.target.value))}>
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre === 'all' ? 'Все жанры' : genre}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
            <option value="rating">По рейтингу</option>
            <option value="year">По году</option>
            <option value="title">По названию</option>
          </select>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="empty-state">
            <p>😕 Фильмы не найдены</p>
          </div>
        ) : (
          <div className="movies-grid">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MoviesPage
