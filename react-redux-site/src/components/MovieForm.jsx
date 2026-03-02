import React, { useState } from 'react'
import '../styles/movieForm.css'

const MovieForm = ({ movie, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: movie?.id || '',
    title: movie?.title || '',
    year: movie?.year || '',
    rating: movie?.rating || '',
    genre: movie?.genre || '',
    director: movie?.director || '',
    actors: movie?.actors || '',
    description: movie?.description || '',
    poster: movie?.poster || '',
    runtime: movie?.runtime || ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Очищаем ошибку для этого поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно'
    }
    
    if (formData.year && (formData.year < 1900 || formData.year > 2025)) {
      newErrors.year = 'Год должен быть от 1900 до 2025'
    }
    
    if (formData.rating && (formData.rating < 0 || formData.rating > 10)) {
      newErrors.rating = 'Рейтинг должен быть от 0 до 10'
    }
    
    if (!formData.genre.trim()) {
      newErrors.genre = 'Жанр обязателен'
    }
    
    if (!formData.director.trim()) {
      newErrors.director = 'Режиссер обязателен'
    }
    
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    onSubmit(formData)
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h2 className="movie-form-title">
        {movie ? '✏️ Редактировать фильм' : '➕ Добавить новый фильм'}
      </h2>

      <div className="movie-form-grid">
        <div className="movie-form-group">
          <label>Название *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Введите название фильма"
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="movie-form-group">
          <label>Год</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="2024"
            min="1900"
            max="2025"
            className={errors.year ? 'error' : ''}
          />
          {errors.year && <span className="error-text">{errors.year}</span>}
        </div>

        <div className="movie-form-group">
          <label>Рейтинг</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="8.5"
            min="0"
            max="10"
            step="0.1"
            className={errors.rating ? 'error' : ''}
          />
          {errors.rating && <span className="error-text">{errors.rating}</span>}
        </div>

        <div className="movie-form-group">
          <label>Жанр *</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Фантастика, Боевик"
            className={errors.genre ? 'error' : ''}
          />
          {errors.genre && <span className="error-text">{errors.genre}</span>}
        </div>

        <div className="movie-form-group">
          <label>Режиссер *</label>
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            placeholder="Кристофер Нолан"
            className={errors.director ? 'error' : ''}
          />
          {errors.director && <span className="error-text">{errors.director}</span>}
        </div>

        <div className="movie-form-group">
          <label>Длительность</label>
          <input
            type="text"
            name="runtime"
            value={formData.runtime}
            onChange={handleChange}
            placeholder="2ч 30мин"
          />
        </div>

        <div className="movie-form-group">
          <label>Актеры</label>
          <input
            type="text"
            name="actors"
            value={formData.actors}
            onChange={handleChange}
            placeholder="Актер 1, Актер 2"
          />
        </div>

        <div className="movie-form-group">
          <label>URL постера</label>
          <input
            type="url"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            placeholder="https://example.com/poster.jpg"
          />
        </div>
      </div>

      <div className="movie-form-group movie-form-full">
        <label>Описание</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Введите описание фильма..."
        />
      </div>

      <div className="movie-form-actions">
        <button type="submit" className="movie-form-submit">
          {movie ? 'Сохранить изменения' : 'Добавить фильм'}
        </button>
        <button type="button" className="movie-form-cancel" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  )
}

export default MovieForm