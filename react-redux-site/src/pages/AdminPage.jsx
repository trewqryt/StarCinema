import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, createMovie, updateMovie, deleteMovie } from '../redux/slices/moviesSlice'
import LoadingSpinner from '../components/LoadingSpinner'

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
      dispatch(createMovie(movieData))
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
          <h1>🛠️ Админ-панель</h1>
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            ➕ Добавить фильм
          </button>
        </div>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editingMovie ? 'Редактировать' : 'Новый фильм'}</h2>
              <form onSubmit={handleSubmit} className="admin-form">
                <input type="text" placeholder="Название" value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                <input type="number" placeholder="Год" value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})} />
                <input type="number" step="0.1" placeholder="Рейтинг" value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: e.target.value})} />
                <input type="text" placeholder="Жанр" value={formData.genre}
                  onChange={(e) => setFormData({...formData, genre: e.target.value})} required />
                <input type="text" placeholder="Режиссер" value={formData.director}
                  onChange={(e) => setFormData({...formData, director: e.target.value})} required />
                <input type="text" placeholder="Актеры" value={formData.actors}
                  onChange={(e) => setFormData({...formData, actors: e.target.value})} />
                <textarea placeholder="Описание" value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" />
                <input type="text" placeholder="URL постера" value={formData.poster}
                  onChange={(e) => setFormData({...formData, poster: e.target.value})} />
                <input type="text" placeholder="Длительность" value={formData.runtime}
                  onChange={(e) => setFormData({...formData, runtime: e.target.value})} />
                <div className="form-actions">
                  <button type="submit">Сохранить</button>
                  <button type="button" onClick={resetForm}>Отмена</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="admin-table">
          <table>
            <thead>
              <tr><th>ID</th><th>Название</th><th>Год</th><th>Рейтинг</th><th>Жанр</th><th>Действия</th></tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie.id}>
                  <td>{movie.id}</td><td>{movie.title}</td><td>{movie.year}</td>
                  <td>⭐ {movie.rating}</td><td>{movie.genre}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(movie)}>✏️</button>
                    <button className="delete-btn" onClick={() => handleDelete(movie.id)}>🗑️</button>
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