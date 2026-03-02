import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/header.css'

const Header = () => {
  const location = useLocation()

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
            <li>
              <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
                ⚙️ Админка
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="login-btn">Войти</button>
          <button className="register-btn">Регистрация</button>
        </div>
      </div>
    </header>
  )
}

export default Header
