import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Бренд */}
          <div className="footer-brand">
            <h3 className="footer-logo">🎬 STAR<span>CINEMA</span></h3>
            <p className="footer-description">
              Твой идеальный кинотеатр. Лучшие фильмы, удобные кресла, незабываемая атмосфера.
            </p>
            <div className="social-icons">
              <a href="#" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="16" cy="8" r="1"/>
                  <circle cx="12" cy="12" r="4"/>
                </svg>
              </a>
              <a href="#" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Навигация */}
          <div className="footer-section">
            <h4>Навигация</h4>
            <ul className="footer-links">
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/movies">Фильмы</Link></li>
              <li><Link to="/favorites">Избранное</Link></li>
              <li><Link to="/admin">Админ-панель</Link></li>
            </ul>
          </div>

          {/* Информация */}
          <div className="footer-section">
            <h4>Информация</h4>
            <ul className="footer-links">
              <li><Link to="/about">О нас</Link></li>
              <li><Link to="/contacts">Контакты</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Условия использования</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div className="footer-section">
            <h4>Контакты</h4>
            <ul className="footer-contacts">
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Токмок, ул. Комсомольская, 1</span>
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                  <line x1="12" y1="18" x2="12" y2="18"/>
                </svg>
                <span>+996 (509) 13-96-16</span>
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>info@starcinema.ru</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Подписка */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h4>Подпишись на новости</h4>
            <p>Получай первым информацию о премьерах и акциях</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Твой email" 
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              Подписаться
            </button>
          </form>
        </div>

        {/* Нижняя панель */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} STAR CINEMA. Все права защищены.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Политика конфиденциальности</Link>
            <span className="separator">|</span>
            <Link to="/cookies">Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer