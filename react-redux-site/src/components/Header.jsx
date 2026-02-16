import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/ui/uiSlice'
import '../styles/header.css'

const Header = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
    document.body.className = theme === 'light' ? 'dark-theme' : 'light-theme'
  }

  return (
    <header className={`header ${theme}-theme`}>
      <div className="header-container">
        <div className="logo">
          <h1>StarCinema</h1>
        </div>
        
        <nav className="nav-menu">
          <ul>
            <li><a href="/" className="nav-link active">Главная</a></li>
            <li><a href="/movies" className="nav-link">Афиша</a></li>
            <li><a href="/soon" className="nav-link">Скоро в кино</a></li>
            <li><a href="/cinemas" className="nav-link">Кинотеатры</a></li>
            <li><a href="/promotions" className="nav-link">Акции</a></li>
            <li><a href="/contacts" className="nav-link">Контакты</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={handleThemeToggle}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="login-btn">Войти</button>
        </div>
      </div>
    </header>
  )
}

export default Header