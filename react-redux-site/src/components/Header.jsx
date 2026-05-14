import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { toggleTheme, setSearchQuery } from '../redux/slices/uiSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { theme, searchQuery } = useSelector((state) => state.ui)
  const favoritesCount = useSelector((state) => state.movies.favorites.length)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value))
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>🎬 CINEMA<span>HUB</span></h1>
          </Link>

          <nav className="nav">
            <Link to="/" className="nav-link">Главная</Link>
            <Link to="/movies" className="nav-link">Фильмы</Link>
            {isAuthenticated && (
              <Link to="/favorites" className="nav-link">
                ⭐ Избранное
                {favoritesCount > 0 && <span className="badge">{favoritesCount}</span>}
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="nav-link">🛠️ Админка</Link>
            )}
          </nav>

          <div className="header-actions">
            <input
              type="text"
              placeholder="🔍 Поиск..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            
            <button className="theme-toggle" onClick={() => dispatch(toggleTheme())}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">{user?.name}</span>
                <button onClick={handleLogout} className="logout-btn">Выйти</button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="login-btn">Войти</Link>
                <Link to="/register" className="register-btn">Регистрация</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header