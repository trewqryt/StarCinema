import React from 'react'
import MovieList from '../components/MovieList'
import '../styles/home.css'

const Home = () => {
  return (
    <main className="home">
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-accent">Добро пожаловать</span>
            <br />в мир большого кино
          </h1>
          <p className="hero-subtitle">Тысячи фильмов, удобные залы, незабываемая атмосфера</p>
          <div className="hero-buttons">
            <button className="hero-button primary">Купить билет</button>
            <button className="hero-button secondary">Выбрать фильм</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Фильмов</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Кинотеатров</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">1M+</span>
            <span className="stat-label">Зрителей</span>
          </div>
        </div>
      </section>

      <MovieList />

      <section className="features">
        <h2 className="section-title">
          <span className="title-accent">Почему</span> выбирают нас
        </h2>
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

      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Подпишись на новинки</h2>
          <p>Получай первым информацию о премьерах и специальных предложениях</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Твой email" className="newsletter-input" />
            <button type="submit" className="newsletter-button">Подписаться</button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Home