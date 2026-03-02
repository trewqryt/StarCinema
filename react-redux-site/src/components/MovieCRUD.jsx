import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  setMovies, 
  addMovie, 
  updateMovie, 
  deleteMovie,
  setLoading, 
  setError 
} from '../features/movies/movieSlice'
import MovieForm from './MovieForm'
import moviesData from '../data/movies.json'
import '../styles/movieCRUD.css'

const MovieCRUD = () => {
  const dispatch = useDispatch()
  const { movies, loading, error } = useSelector((state) => state.movies)
  
  const [showForm, setShowForm] = useState(false)
  const [editingMovie, setEditingMovie] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadMovies = async () => {
      try {
        dispatch(setLoading(true))
        // Имитация загрузки
        await new Promise(resolve => setTimeout(resolve, 1000))
        dispatch(setMovies(moviesData.movies))
        dispatch(setError(null))
      } catch (err) {
        dispatch(setError(err.message))
      } finally {
        dispatch(setLoading(false))
      }
    }

    if (movies.length === 0) {
      loadMovies()
    }
  }, [dispatch, movies.length])

  // CREATE - добавить фильм
  const handleAddMovie = (movieData) => {
    const newMovie = {
      ...movieData,
      id: Date.now(), // генерируем уникальный ID
      rating: parseFloat(movieData.rating) || 0,
      year: parseInt(movieData.year) || 2024
    }
    
    dispatch(addMovie(newMovie))
    setShowForm(false)
    alert(`✅ Фильм "${newMovie.title}" успешно добавлен!`)
  }

  // UPDATE - обновить фильм
  const handleUpdateMovie = (movieData) => {
    dispatch(updateMovie(movieData))
    setEditingMovie(null)
    setShowForm(false)
    alert(`✅ Фильм "${movieData.title}" успешно обновлен!`)
  }

  // DELETE - удалить фильм
  const handleDeleteMovie = (movieId, movieTitle) => {
    dispatch(deleteMovie(movieId))
    setDeleteConfirm(null)
    alert(`✅ Фильм "${movieTitle}" успешно удален!`)
  }

  // Открыть форму для добавления
  const openAddForm = () => {
    setEditingMovie(null)
    setShowForm(true)
  }

  // Открыть форму для редактирования
  const openEditForm = (movie) => {
    setEditingMovie(movie)
    setShowForm(true)
  }

  // Фильтрация фильмов по поиску
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.director.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading && movies.length === 0) {
    return (
      <div className="crud-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Загрузка фильмов...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2 className="crud-title">
          <span className="title-accent">Управление</span> фильмами
        </h2>
        <button className="crud-add-button" onClick={openAddForm}>
          <span className="button-icon">➕</span>
          Добавить фильм
        </button>
      </div>

      {/* Поиск */}
      <div className="crud-search">
        <input
          type="text"
          placeholder="🔍 Поиск по названию, жанру или режиссеру..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="crud-search-input"
        />
      </div>

      {error && (
        <div className="crud-error">
          <p>❌ {error}</p>
          <button onClick={() => window.location.reload()}>Повторить</button>
        </div>
      )}

      {/* Таблица фильмов */}
      <div className="crud-table-container">
        <table className="crud-table">
          <thead>
            <tr>
              <th>Постер</th>
              <th>Название</th>
              <th>Год</th>
              <th>Рейтинг</th>
              <th>Жанр</th>
              <th>Режиссер</th>
              <th>Длит.</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <tr key={movie.id}>
                <td className="crud-table-poster">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/50x70?text=🎬'
                    }}
                  />
                </td>
                <td className="crud-table-title">{movie.title}</td>
                <td>{movie.year}</td>
                <td>
                  <span className="crud-rating">⭐ {movie.rating}</span>
                </td>
                <td>{movie.genre}</td>
                <td>{movie.director}</td>
                <td>{movie.runtime}</td>
                <td>
                  <div className="crud-actions">
                    <button 
                      className="crud-edit-btn"
                      onClick={() => openEditForm(movie)}
                      title="Редактировать"
                    >
                      ✏️
                    </button>
                    <button 
                      className="crud-delete-btn"
                      onClick={() => setDeleteConfirm({ id: movie.id, title: movie.title })}
                      title="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMovies.length === 0 && (
          <div className="crud-empty">
            <p>😕 Фильмы не найдены</p>
          </div>
        )}
      </div>

      {/* Модальное окно с формой */}
      {showForm && (
        <div className="crud-modal-overlay">
          <div className="crud-modal">
            <button className="crud-modal-close" onClick={() => setShowForm(false)}>×</button>
            <MovieForm 
              movie={editingMovie}
              onSubmit={editingMovie ? handleUpdateMovie : handleAddMovie}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Модальное окно подтверждения удаления */}
      {deleteConfirm && (
        <div className="crud-modal-overlay">
          <div className="crud-modal crud-modal-small">
            <h3>Подтверждение удаления</h3>
            <p>Вы уверены, что хотите удалить фильм <strong>"{deleteConfirm.title}"</strong>?</p>
            <div className="crud-confirm-buttons">
              <button 
                className="crud-confirm-yes"
                onClick={() => handleDeleteMovie(deleteConfirm.id, deleteConfirm.title)}
              >
                Да, удалить
              </button>
              <button 
                className="crud-confirm-no"
                onClick={() => setDeleteConfirm(null)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieCRUD