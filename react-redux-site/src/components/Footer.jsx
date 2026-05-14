import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>🎬 CINEMAHUB</h4>
            <p>Твой идеальный кинотеатр</p>
          </div>
          <div className="footer-section">
            <h4>Навигация</h4>
            <Link to="/">Главная</Link>
            <Link to="/movies">Фильмы</Link>
            <Link to="/favorites">Избранное</Link>
          </div>
          <div className="footer-section">
            <h4>Контакты</h4>
            <a href="mailto:info@cinemahub.ru">info@cinemahub.ru</a>
            <a href="tel:+79991234567">+7 (999) 123-45-67</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 CINEMAHUB. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer