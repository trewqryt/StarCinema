import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, updateProfile } from '../features/auth/authSlice'
import '../styles/profile.css'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  
  const [isEditing, setIsEditing] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    phone: user?.phone || ''
  })

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    dispatch(updateProfile(formData))
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || '👤'}
          </div>
          <h1>Личный кабинет</h1>
          <p>Добро пожаловать, {user?.name}!</p>
        </div>
        
        <div className="profile-info">
          <div className="info-section">
            <h3>Информация о пользователе</h3>
            
            {isEditing ? (
              <>
                <div className="info-row">
                  <label>Имя:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-row">
                  <label>Email:</label>
                  <span>{user?.email}</span>
                  <small>(нельзя изменить)</small>
                </div>
                <div className="info-row">
                  <label>Телефон:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="profile-actions">
                  <button className="save-btn" onClick={handleSave}>Сохранить</button>
                  <button className="cancel-btn" onClick={() => setIsEditing(false)}>Отмена</button>
                </div>
              </>
            ) : (
              <>
                <div className="info-row">
                  <label>Имя:</label>
                  <span>{user?.name}</span>
                </div>
                <div className="info-row">
                  <label>Email:</label>
                  <span>{user?.email}</span>
                </div>
                <div className="info-row">
                  <label>Телефон:</label>
                  <span>{user?.phone || 'Не указан'}</span>
                </div>
                <div className="info-row">
                  <label>Дата регистрации:</label>
                  <span>{new Date(user?.createdAt).toLocaleDateString('ru-RU')}</span>
                </div>
                <div className="profile-actions">
                  <button className="edit-btn" onClick={handleEdit}>✏️ Редактировать</button>
                </div>
              </>
            )}
          </div>
          
          <div className="info-section">
            <h3>Статистика</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">0</div>
                <div className="stat-label">Просмотренных фильмов</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">0</div>
                <div className="stat-label">Купленных билетов</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">0</div>
                <div className="stat-label">Отзывов</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage