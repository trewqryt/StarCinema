import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../redux/slices/uiSlice'
import { logout } from '../redux/slices/authSlice'
import './Header.css'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { searchQuery } = useSelector(state => state.ui)
  const { favorites } = useSelector(state => state.movies)
  const { isAuthenticated, user } = useSelector(state => state.auth)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate('/movies')
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <h1>🎬 STAR<span>CINEMA</span></h1>
          </Link>

          {/* Navigation */}
          <nav className="nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Главная
            </Link>
            <Link to="/movies" className={`nav-link ${isActive('/movies') ? 'active' : ''}`}>
              Фильмы
            </Link>
            {isAuthenticated && (
              <Link to="/favorites" className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}>
                Избранное
                {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Профиль
              </Link>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
                Админ
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="header-right">
            {/* Search */}
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Поиск фильмов..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="search-input"
                />
                <button type="submit" className="search-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </button>
              </div>
            </form>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  {user?.name?.split(' ')[0] || 'User'}
                </span>
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