import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/home.css'

const Home = () => {
  const theme = useSelector((state) => state.ui.theme)

  return (
    <main className={`home ${theme}-theme`}>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Добро пожаловать в StarCinema!</h1>
          <p>Лучшие фильмы, удобные кресла, незабываемая атмосфера</p>
          <button className="cta-button">Купить билет</button>
        </div>
      </section>

      <section className="features">
        <h2>Почему выбирают нас</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎬</div>
            <h3>Новинки кино</h3>
            <p>Все премьеры в день выхода</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🍿</div>
            <h3>Комфорт</h3>
            <p>Удобные кресла и вкусный попкорн</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎫</div>
            <h3>Акции</h3>
            <p>Скидки и специальные предложения</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Удобство</h3>
            <p>Быстрый онлайн-заказ билетов</p>
          </div>
        </div>
      </section>

      <section className="coming-soon">
        <h2>Скоро в кино</h2>
        <div className="movies-preview">
          <p>Здесь будут отображаться предстоящие премьеры</p>
          <p className="coming-soon-text">Скоро появится афиша фильмов! 🎥</p>
        </div>
      </section>
    </main>
  )
}

export default Home