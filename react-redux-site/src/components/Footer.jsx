import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/footer.css'

const Footer = () => {
  const theme = useSelector((state) => state.ui.theme)

  return (
    <footer className={`footer ${theme}-theme`}>
      <div className="footer-container">
        <div className="footer-section">
          <h3>StarCinema</h3>
          <p>Ваш идеальный кинотеатр для незабываемых впечатлений</p>
        </div>
        
        <div className="footer-section">
          <h4>Навигация</h4>
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/movies">Афиша</a></li>
            <li><a href="/soon">Скоро в кино</a></li>
            <li><a href="/cinemas">Кинотеатры</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Контакты</h4>
          <ul>
            <li> +996 (509) 13 96 16</li>
            <li> info@starcinema.ru</li>
            <li> ул. Кинотеатральная, 1</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Мы в соцсетях</h4>
          <div className="social-links">
            <a href="#" className="social-link"></a>
            <a href="#" className="social-link"></a>
            <a href="#" className="social-link"></a>
            <a href="#" className="social-link"></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 StarCinema. Все права защищены.</p>
      </div>
    </footer>
  )
}

export default Footer