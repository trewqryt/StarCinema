import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMovie, updateMovie, deleteMovie, setMovies } from '../features/movies/movieSlice'
import '../styles/movieCRUD.css'

const MovieCRUD = () => {
  const dispatch = useDispatch()
  const { movies } = useSelector((state) => state.movies)
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    year: '',
    rating: '',
    genre: '',
    director: '',
    actors: '',
    description: '',
    poster: '',
    runtime: ''
  })
  
  const [isEditing, setIsEditing] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteId, setDeleteId] = useState(null)

  // Загрузка начальных данных
  useEffect(() => {
    const savedMovies = localStorage.getItem('movies')
    if (savedMovies) {
      dispatch(setMovies(JSON.parse(savedMovies)))
    } else {
      // Начальные данные
      const initialMovies = [
        {
          id: 1,
          title: "Дюна: Часть вторая",
          year: 2024,
          rating: 8.9,
          genre: "Фантастика, Боевик",
          director: "Дени Вильнёв",
          actors: "Тимоти Шаламе, Зендея, Остин Батлер",
          description: "Пол Атрейдес объединяется с фрименами, чтобы отомстить заговорщикам.",
          poster: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
          runtime: "2ч 46мин"
        },
        {
          id: 2,
          title: "Оппенгеймер",
          year: 2023,
          rating: 8.5,
          genre: "Драма, Биография",
          director: "Кристофер Нолан",
          actors: "Киллиан Мёрфи, Эмили Блант, Мэтт Дэймон",
          description: "История жизни создателя атомной бомбы.",
          poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
          runtime: "3ч"
        },
        {
          id: 3,
          title: "Барби",
          year: 2023,
          rating: 7.0,
          genre: "Комедия, Фэнтези",
          director: "Грета Гервиг",
          actors: "Марго Робби, Райан Гослинг",
          description: "Барби отправляется в реальный мир.",
          poster: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
          runtime: "1ч 54мин"
        }
      ]
      dispatch(setMovies(initialMovies))
      localStorage.setItem('movies', JSON.stringify(initialMovies))
    }
  }, [dispatch])

  // Сохранение в localStorage при изменении movies
  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(movies))
    }
  }, [movies])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      year: '',
      rating: '',
      genre: '',
      director: '',
      actors: '',
      description: '',
      poster: '',
      runtime: ''
    })
    setIsEditing(false)
    setShowForm(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.genre || !formData.director) {
      alert('Заполните обязательные поля: Название, Жанр, Режиссер')
      return
    }

    if (isEditing) {
      dispatch(updateMovie(formData))
      alert('Фильм обновлен!')
    } else {
      const newMovie = {
        ...formData,
        id: Date.now(),
        year: parseInt(formData.year) || 2024,
        rating: parseFloat(formData.rating) || 0
      }
      dispatch(addMovie(newMovie))
      alert('Фильм добавлен!')
    }
    resetForm()
  }

  const handleEdit = (movie) => {
    setFormData(movie)
    setIsEditing(true)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот фильм?')) {
      dispatch(deleteMovie(id))
      alert('Фильм удален!')
    }
    setDeleteId(null)
  }

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.director.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>🎬 Управление фильмами</h2>
        <button className="btn-add" onClick={() => { resetForm(); setShowForm(true) }}>
          ➕ Добавить фильм
        </button>
      </div>

      <div className="crud-search">
        <input
          type="text"
          placeholder="🔍 Поиск по названию, жанру или режиссеру..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{isEditing ? '✏️ Редактировать фильм' : '➕ Новый фильм'}</h3>
              <button className="modal-close" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="crud-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Название *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Год</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Рейтинг</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    step="0.1"
                    placeholder="0-10"
                  />
                </div>
                <div className="form-group">
                  <label>Длительность</label>
                  <input
                    type="text"
                    name="runtime"
                    value={formData.runtime}
                    onChange={handleChange}
                    placeholder="2ч 30мин"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Жанр *</label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Режиссер *</label>
                  <input
                    type="text"
                    name="director"
                    value={formData.director}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Актеры</label>
                <input
                  type="text"
                  name="actors"
                  value={formData.actors}
                  onChange={handleChange}
                  placeholder="Актер 1, Актер 2"
                />
              </div>

              <div className="form-group">
                <label>URL постера</label>
                <input
                  type="text"
                  name="poster"
                  value={formData.poster}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              <div className="form-group">
                <label>Описание</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Описание фильма..."
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  {isEditing ? '💾 Сохранить' : '➕ Добавить'}
                </button>
                <button type="button" className="btn-cancel" onClick={resetForm}>
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="crud-table-wrapper">
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
            {filteredMovies.map(movie => (
              <tr key={movie.id}>
                <td className="poster-cell">
                  <img 
                    src={movie.poster || 'https://via.placeholder.com/50x70?text=🎬'} 
                    alt={movie.title}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/50x70?text=🎬'}
                  />
                </td>
                <td className="title-cell">{movie.title}</td>
                <td>{movie.year}</td>
                <td><span className="rating-badge">⭐ {movie.rating}</span></td>
                <td>{movie.genre}</td>
                <td>{movie.director}</td>
                <td>{movie.runtime}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit" onClick={() => handleEdit(movie)}>✏️</button>
                    <button className="btn-delete" onClick={() => handleDelete(movie.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredMovies.length === 0 && (
          <div className="empty-state">
            😕 Фильмы не найдены
          </div>
        )}
      </div>
      
      <div className="crud-stats">
        Всего фильмов: <strong>{movies.length}</strong>
      </div>
    </div>
  )
}

export default MovieCRUD