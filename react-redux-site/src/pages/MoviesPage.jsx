import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../redux/slices/moviesSlice'
import { setFilterGenre, setSortBy } from '../redux/slices/uiSlice'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'

const MoviesPage = () => {
  const dispatch = useDispatch()
  const { movies, loading, error } = useSelector((state) => state.movies)
  const { searchQuery, filterGenre, sortBy } = useSelector((state) => state.ui)

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchMovies())
    }
  }, [dispatch, movies.length])

  const genres = ['all', ...new Set(movies.map(m => m.genre))]

  let filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = filterGenre === 'all' || movie.genre === filterGenre
    return matchesSearch && matchesGenre
  })

  filteredMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'year') return b.year - a.year
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    return 0
  })

  if (loading && movies.length === 0) return <LoadingSpinner />
  if (error) return <div className="error-state">❌ {error}</div>

  return (
    <div className="movies-page">
      <div className="container">
        <div className="page-header">
          <h1>Все фильмы</h1>
          <p>{filteredMovies.length} фильмов найдено</p>
        </div>

        <div className="filters-bar">
          <div className="filter-group">
            <label>Жанр:</label>
            <select 
              value={filterGenre} 
              onChange={(e) => dispatch(setFilterGenre(e.target.value))}
              className="filter-select"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'Все' : genre}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Сортировать по:</label>
            <select 
              value={sortBy} 
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="filter-select"
            >
              <option value="rating">Рейтинг</option>
              <option value="year">Год</option>
              <option value="title">Название</option>
            </select>
          </div>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="empty-state">
            <p>😕 Фильмы не найдены</p>
            <button onClick={() => window.location.reload()}>Попробовать снова</button>
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