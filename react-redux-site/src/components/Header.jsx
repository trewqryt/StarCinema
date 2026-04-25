import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import '../styles/header.css'

const Header = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>🎬 CINEMA<span className="logo-accent">HUB</span></h1>
          </Link>
        </div>
        
        <nav className="nav-menu">
          <ul>
            <li>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Главная
              </Link>
            </li>
            <li>
              <Link to="/movies" className="nav-link">Афиша</Link>
            </li>
            <li>
              <Link to="/soon" className="nav-link">Скоро</Link>
            </li>
            <li>
              <Link to="/cinemas" className="nav-link">Кинотеатры</Link>
            </li>
            {user?.role === 'admin' && (
              <li>
                <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
                  ⚙️ Админка
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="profile-link">
                <span className="profile-avatar-small">
                  {user?.name?.charAt(0)?.toUpperCase() || '👤'}
                </span>
                <span>{user?.name}</span>
              </Link>
              <button className="logout-btn-header" onClick={handleLogout}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">Войти</Link>
              <Link to="/register" className="register-btn">Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header