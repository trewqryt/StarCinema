import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, addMovie, updateMovie, deleteMovie } from '../redux/slices/moviesSlice'
import LoadingSpinner from '../components/LoadingSpinner'
import './AdminPage.css'

const AdminPage = () => {
  const dispatch = useDispatch()
  const { movies, loading } = useSelector((state) => state.movies)
  const [editingMovie, setEditingMovie] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '', year: '', rating: '', genre: '', director: '',
    actors: '', description: '', poster: '', runtime: ''
  })

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchMovies())
    }
  }, [dispatch, movies.length])

  const handleSubmit = (e) => {
    e.preventDefault()
    const movieData = {
      ...formData,
      year: parseInt(formData.year),
      rating: parseFloat(formData.rating)
    }
    
    if (editingMovie) {
      dispatch(updateMovie({ id: editingMovie.id, movieData }))
    } else {
      dispatch(addMovie(movieData))
    }
    resetForm()
  }

  const handleEdit = (movie) => {
    setEditingMovie(movie)
    setFormData(movie)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Удалить фильм?')) {
      dispatch(deleteMovie(id))
    }
  }

  const resetForm = () => {
    setEditingMovie(null)
    setShowForm(false)
    setFormData({
      title: '', year: '', rating: '', genre: '', director: '',
      actors: '', description: '', poster: '', runtime: ''
    })
  }

  if (loading && movies.length === 0) return <LoadingSpinner />

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Управление фильмами</h1>
          <button className="admin-add-btn" onClick={() => setShowForm(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Добавить фильм
          </button>
        </div>

        {showForm && (
          <div className="admin-modal-overlay" onClick={() => resetForm()}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h3>{editingMovie ? 'Редактировать фильм' : 'Новый фильм'}</h3>
                <button className="admin-modal-close" onClick={resetForm}>×</button>
              </div>
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-row">
                  <input type="text" placeholder="Название" value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                  <input type="number" placeholder="Год" value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})} />
                </div>
                <div className="admin-form-row">
                  <input type="number" step="0.1" placeholder="Рейтинг" value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})} />
                  <input type="text" placeholder="Жанр" value={formData.genre}
                    onChange={(e) => setFormData({...formData, genre: e.target.value})} required />
                </div>
                <div className="admin-form-row">
                  <input type="text" placeholder="Режиссер" value={formData.director}
                    onChange={(e) => setFormData({...formData, director: e.target.value})} required />
                  <input type="text" placeholder="Длительность" value={formData.runtime}
                    onChange={(e) => setFormData({...formData, runtime: e.target.value})} />
                </div>
                <input type="text" placeholder="Актеры" value={formData.actors}
                  onChange={(e) => setFormData({...formData, actors: e.target.value})} />
                <input type="text" placeholder="URL постера" value={formData.poster}
                  onChange={(e) => setFormData({...formData, poster: e.target.value})} />
                <textarea placeholder="Описание" value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" />
                <div className="admin-form-actions">
                  <button type="submit" className="admin-btn-save">
                    {editingMovie ? 'Сохранить' : 'Добавить'}
                  </button>
                  <button type="button" className="admin-btn-cancel" onClick={resetForm}>
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Год</th>
                <th>Рейтинг</th>
                <th>Жанр</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie.id}>
                  <td className="admin-id">#{movie.id}</td>
                  <td className="admin-title">{movie.title}</td>
                  <td>{movie.year}</td>
                  <td className="admin-rating">★ {movie.rating}</td>
                  <td className="admin-genre">{movie.genre?.split(',')[0]}</td>
                  <td className="admin-actions">
                    <button className="admin-edit" onClick={() => handleEdit(movie)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 3l4 4-7 7H10v-4l7-7z"/>
                        <path d="M4 20h16"/>
                      </svg>
                    </button>
                    <button className="admin-delete" onClick={() => handleDelete(movie.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M8 6V4h8v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminPage