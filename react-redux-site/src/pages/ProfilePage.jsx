import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/authSlice'
import './ProfilePage.css'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const { favorites, movies } = useSelector(state => state.movies)
  
  const favoriteMovies = movies.filter(m => favorites.includes(m.id))
  const favoriteCount = favoriteMovies.length

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>Не авторизован</h2>
          <p>Пожалуйста, войдите в аккаунт</p>
          <button onClick={() => navigate('/login')}>Войти</button>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Avatar Section */}
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user.name?.charAt(0)?.toUpperCase() || '👤'}
          </div>
          <h2>{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <p className="profile-member">
            Участник с {new Date(user.createdAt).toLocaleDateString('ru-RU')}
          </p>
        </div>

        {/* Stats Section */}
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-value">{favoriteCount}</div>
            <div className="stat-label">Избранных фильмов</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">0</div>
            <div className="stat-label">Просмотрено</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">0</div>
            <div className="stat-label">Отзывов</div>
          </div>
        </div>

        {/* Info Section */}
        <div className="profile-info">
          <div className="info-section">
            <h3>Личная информация</h3>
            <div className="info-row">
              <span className="info-label">Имя:</span>
              <span className="info-value">{user.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Роль:</span>
              <span className="info-value role-badge">
                {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Дата регистрации:</span>
              <span className="info-value">
                {new Date(user.createdAt).toLocaleDateString('ru-RU')}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="profile-actions">
          <button onClick={() => navigate('/favorites')} className="profile-btn favorites-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Мои избранные
          </button>
          <button onClick={handleLogout} className="profile-btn logout-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage