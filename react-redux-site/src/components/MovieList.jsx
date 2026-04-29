import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  setMovies, 
  setLoading, 
  setError, 
  setCurrentMovie,
  toggleLike,
  toggleFavorite
} from '../features/movies/movieSlice'
import MovieDetail from './MovieDetail'
import '../styles/movieList.css'

const MovieList = () => {
  const dispatch = useDispatch()
  const { movies, loading, error } = useSelector((state) => state.movies)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const likes = useSelector((state) => state.movies.likes)
  const favorites = useSelector((state) => state.movies.favorites)
  const ratings = useSelector((state) => state.movies.ratings)

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  // Полный список фильмов (25 штук)
  const fullMoviesList = [
    {
      id: 1,
      title: "Дюна: Часть вторая",
      year: 2024,
      rating: 8.9,
      genre: "Фантастика, Боевик",
      director: "Дени Вильнёв",
      actors: "Тимоти Шаламе, Зендея, Остин Батлер",
      description: "Пол Атрейдес объединяется с фрименами, чтобы отомстить заговорщикам.",
      poster: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
      runtime: "2ч 46мин"
    },
    {
      id: 2,
      title: "Оппенгеймер",
      year: 2023,
      rating: 8.5,
      genre: "Драма, Биография",
      director: "Кристофер Нолан",
      actors: "Киллиан Мёрфи, Эмили Блант, Мэтт Дэймон",
      description: "История жизни создателя атомной бомбы.",
      poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
      runtime: "3ч"
    },
    {
      id: 3,
      title: "Барби",
      year: 2023,
      rating: 7.0,
      genre: "Комедия, Фэнтези",
      director: "Грета Гервиг",
      actors: "Марго Робби, Райан Гослинг",
      description: "Барби отправляется в реальный мир.",
      poster: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
      runtime: "1ч 54мин"
    },
    {
      id: 4,
      title: "Стражи Галактики. Часть 3",
      year: 2023,
      rating: 8.1,
      genre: "Фантастика, Боевик",
      director: "Джеймс Ганн",
      actors: "Крис Пратт, Зои Салдана",
      description: "Стражи Галактики отправляются на поиски Ракеты.",
      poster: "https://m.media-amazon.com/images/M/MV5BOTA2NTU5MjU5NF5BMl5BanBnXkFtZTgwOTA3MDE0MDE@._V1_.jpg",
      runtime: "2ч 30мин"
    },
    {
      id: 5,
      title: "Человек-паук: Паутина вселенных",
      year: 2023,
      rating: 8.7,
      genre: "Мультфильм, Фантастика",
      director: "Жуакин Душ Сантуш",
      actors: "Шамеик Мур, Хейли Стайнфелд",
      description: "Майлз Моралес отправляется в путешествие по мультивселенной.",
      poster: "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg",
      runtime: "2ч 20мин"
    },
    {
      id: 6,
      title: "Джон Уик 4",
      year: 2023,
      rating: 8.0,
      genre: "Боевик, Триллер",
      director: "Чад Стахелски",
      actors: "Киану Ривз, Лоренс Фишбёрн",
      description: "Джон Уик продолжает борьбу с Правлением Кланов.",
      poster: "https://m.media-amazon.com/images/M/MV5BODQ3YThiZDMtY2U0Yi00YzRjLWI3MzQtY2FkZDNjMjI3ZDBkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
      runtime: "2ч 49мин"
    },
    {
      id: 7,
      title: "Наполеон",
      year: 2023,
      rating: 6.5,
      genre: "Исторический, Боевик",
      director: "Ридли Скотт",
      actors: "Хоакин Феникс, Ванесса Кирби",
      description: "Взлет и падение Наполеона Бонапарта.",
      poster: "https://m.media-amazon.com/images/M/MV5BZjE1YWI3YWItMGVlZi00YTM4LThhOTYtNTU3NWI1MTUwMjU3XkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_.jpg",
      runtime: "2ч 38мин"
    },
    {
      id: 8,
      title: "Аквамен: Потерянное царство",
      year: 2023,
      rating: 6.2,
      genre: "Фантастика, Боевик",
      director: "Джеймс Ван",
      actors: "Джейсон Момоа, Патрик Уилсон",
      description: "Аквамен объединяется с братом, чтобы остановить Черную Манту.",
      poster: "https://m.media-amazon.com/images/M/MV5BOTk2NzUyOTctZDdlMy00ZmM2LWI4YTMtNmU3ZWMzYzhjNDRlXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
      runtime: "2ч 4мин"
    },
    {
      id: 9,
      title: "Годзилла: Минус один",
      year: 2023,
      rating: 8.3,
      genre: "Боевик, Фантастика",
      director: "Такаси Ямадзаки",
      actors: "Рюносукэ Камики, Минами Хамабэ",
      description: "Послевоенная Япония сталкивается с появлением гигантского монстра.",
      poster: "https://m.media-amazon.com/images/M/MV5BZDMxOGQ0YzgtY2E3Yy00ODQ4LWE4Y2EtMTYyOTZlYmM0Y2UxXkEyXkFqcGdeQXVyMTU5OTA4NTIz._V1_.jpg",
      runtime: "2ч 5мин"
    },
    {
      id: 10,
      title: "Миссия невыполнима: Смертельная расплата",
      year: 2023,
      rating: 7.9,
      genre: "Боевик, Триллер",
      director: "Кристофер Маккуорри",
      actors: "Том Круз, Хейли Этвелл",
      description: "Итан Хант противостоит искусственному интеллекту.",
      poster: "https://m.media-amazon.com/images/M/MV5BYzFiZjc1YzctMDY3Zi00NGE5LTlmYjgtMGY5ZjgyMjQ4MGNiXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
      runtime: "2ч 43мин"
    },
    {
      id: 11,
      title: "Флэш",
      year: 2023,
      rating: 6.7,
      genre: "Фантастика, Боевик",
      director: "Энди Мускетти",
      actors: "Эзра Миллер, Майкл Китон",
      description: "Флэш путешествует во времени, чтобы спасти свою семью.",
      poster: "https://m.media-amazon.com/images/M/MV5BMjMxMjY0NDA5MV5BMl5BanBnXkFtZTgwODU0NzU3MDI@._V1_.jpg",
      runtime: "2ч 24мин"
    },
    {
      id: 12,
      title: "Индиана Джонс и Колесо судьбы",
      year: 2023,
      rating: 6.7,
      genre: "Приключения, Боевик",
      director: "Джеймс Мэнголд",
      actors: "Харрисон Форд, Фиби Уоллер-Бридж",
      description: "Индиана Джонс отправляется в последнее приключение.",
      poster: "https://m.media-amazon.com/images/M/MV5BNDVmYzU3YzAtYzQwYS00MTE5LTgxN2UtZTA5MDI3MmQ4MDI3XkEyXkFqcGdeQXVyMTAxNzQ1ODI@._V1_.jpg",
      runtime: "2ч 34мин"
    },
    {
      id: 13,
      title: "Подземелья и драконы",
      year: 2023,
      rating: 7.3,
      genre: "Фэнтези, Комедия",
      director: "Джон Фрэнсис Дейли",
      actors: "Крис Пайн, Мишель Родригес",
      description: "Бард отправляется в приключение с группой неудачников.",
      poster: "https://m.media-amazon.com/images/M/MV5BMTQyMjM3NzY4MF5BMl5BanBnXkFtZTgwODI5NzY5NDM@._V1_.jpg",
      runtime: "2ч 14мин"
    },
    {
      id: 14,
      title: "Трансформеры: Восхождение Звероботов",
      year: 2023,
      rating: 6.4,
      genre: "Фантастика, Боевик",
      director: "Стивен Кейпл мл.",
      actors: "Энтони Рамос, Доминик Фишбэк",
      description: "Оптимус Прайм объединяется с максималами.",
      poster: "https://m.media-amazon.com/images/M/MV5BOTIzNjU5MzY3M15BMl5BanBnXkFtZTgwNjU1MTY4MTI@._V1_.jpg",
      runtime: "2ч 7мин"
    },
    {
      id: 15,
      title: "Элементарно",
      year: 2023,
      rating: 7.1,
      genre: "Мультфильм, Комедия",
      director: "Питер Сон",
      actors: "Лия Льюис, Мамуду Ати",
      description: "В городе стихий девушка-огонь знакомится с парнем-водой.",
      poster: "https://m.media-amazon.com/images/M/MV5BOTI1MTQzMjY5Nl5BMl5BanBnXkFtZTgwMjQ5MjU5NDM@._V1_.jpg",
      runtime: "1ч 42мин"
    },
    {
      id: 16,
      title: "Тетрис",
      year: 2023,
      rating: 7.3,
      genre: "Триллер, Биография",
      director: "Джон С. Бейрд",
      actors: "Тэрон Эджертон, Никита Ефремов",
      description: "История получения прав на игру Тетрис в СССР.",
      poster: "https://m.media-amazon.com/images/M/MV5BNDZmZmUyZmItZTgyNC00MGI1LWJhZjctMDk1YjlmODA4YzRjXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
      runtime: "1ч 58мин"
    },
    {
      id: 17,
      title: "Воздух",
      year: 2023,
      rating: 7.4,
      genre: "Драма, Спорт",
      director: "Бен Аффлек",
      actors: "Мэтт Дэймон, Бен Аффлек",
      description: "История создания бренда Air Jordan.",
      poster: "https://m.media-amazon.com/images/M/MV5BZjI5ZDQ1NjktYjUxOS00NjY1LWI3NDYtMjYwOTczODQ4ZTM2XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
      runtime: "1ч 52мин"
    },
    {
      id: 18,
      title: "Крик 6",
      year: 2023,
      rating: 6.6,
      genre: "Ужасы, Триллер",
      director: "Мэттью Беттинелли",
      actors: "Мелисса Баррера, Джена Ортега",
      description: "Выжившие сталкиваются с новым Призрачным лицом в Нью-Йорке.",
      poster: "https://m.media-amazon.com/images/M/MV5BMjA3MjM5NzE4NV5BMl5BanBnXkFtZTgwNzc5MjY5NDM@._V1_.jpg",
      runtime: "2ч 2мин"
    },
    {
      id: 19,
      title: "Маэстро",
      year: 2023,
      rating: 7.6,
      genre: "Драма, Биография",
      director: "Брэдли Купер",
      actors: "Брэдли Купер, Кэри Маллиган",
      description: "История жизни композитора Леонарда Бернстайна.",
      poster: "https://m.media-amazon.com/images/M/MV5BMzU5MjEwMTg2Nl5BMl5BanBnXkFtZTcwMTU5MjY1Mg@@._V1_.jpg",
      runtime: "2ч 9мин"
    },
    {
      id: 20,
      title: "Солтберн",
      year: 2023,
      rating: 7.4,
      genre: "Драма, Триллер",
      director: "Эмиральд Феннел",
      actors: "Барри Кеоган, Джейкоб Элорди",
      description: "Студент Оксфорда попадает в мир аристократии.",
      poster: "https://m.media-amazon.com/images/M/MV5BOGJmMGI4YzktYzU3NC00MmZlLWI3ZmQtZmQzMjU1NzBkMDQ1XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
      runtime: "2ч 11мин"
    }
  ]

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        dispatch(setLoading(true))
        await delay(500)
        
        // Проверяем, есть ли фильмы в localStorage
        const savedMovies = localStorage.getItem('movies')
        
        if (savedMovies) {
          const parsedMovies = JSON.parse(savedMovies)
          // Если в localStorage меньше фильмов, чем в полном списке - обновляем
          if (parsedMovies.length < fullMoviesList.length) {
            // Сохраняем существующие лайки/избранное, но добавляем новые фильмы
            const existingIds = parsedMovies.map(m => m.id)
            const newMovies = fullMoviesList.filter(m => !existingIds.includes(m.id))
            const allMovies = [...parsedMovies, ...newMovies]
            dispatch(setMovies(allMovies))
            localStorage.setItem('movies', JSON.stringify(allMovies))
          } else {
            dispatch(setMovies(parsedMovies))
          }
        } else {
          // Если нет сохраненных фильмов - сохраняем полный список
          dispatch(setMovies(fullMoviesList))
          localStorage.setItem('movies', JSON.stringify(fullMoviesList))
        }
      } catch (err) {
        dispatch(setError(err.message))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchMovies()
  }, [dispatch])

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
    dispatch(setCurrentMovie(movie))
  }

  const handleCloseDetail = () => {
    setSelectedMovie(null)
    dispatch(setCurrentMovie(null))
  }

  const handleLike = (e, movieId) => {
    e.stopPropagation()
    dispatch(toggleLike(movieId))
  }

  const handleFavorite = (e, movieId) => {
    e.stopPropagation()
    dispatch(toggleFavorite(movieId))
  }

  const getAverageRating = (movieId) => {
    const movieRatings = ratings[movieId] || []
    if (movieRatings.length === 0) return 0
    const sum = movieRatings.reduce((a, b) => a + b, 0)
    return (sum / movieRatings.length).toFixed(1)
  }

  const getRatingsCount = (movieId) => {
    return (ratings[movieId] || []).length
  }

  if (loading) {
    return (
      <div className="movie-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Загрузка фильмов...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="movie-list-container">
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={() => window.location.reload()}>Попробовать снова</button>
        </div>
      </div>
    )
  }

  return (
    <div className="movie-list-container">
      <h2 className="section-title">
        <span className="title-accent">Сейчас</span> в прокате
      </h2>
      
      <div className="movie-content">
        <div className={`movies-list ${selectedMovie ? 'with-detail' : ''}`}>
          {movies && movies.map((movie) => {
            const isLiked = likes[movie.id] || false
            const isFav = favorites.includes(movie.id)
            const avgRating = getAverageRating(movie.id)
            const ratingsCount = getRatingsCount(movie.id)
            
            return (
              <div
                key={movie.id}
                className={`movie-card ${selectedMovie?.id === movie.id ? 'selected' : ''}`}
                onClick={() => handleMovieClick(movie)}
              >
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="movie-poster"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = `https://via.placeholder.com/80x120?text=${movie.title?.charAt(0) || '?'}`
                  }}
                />
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-year">{movie.year}</p>
                  <div className="movie-meta">
                    <span className="movie-rating">⭐ {movie.rating}</span>
                    <span className="movie-genre">{movie.genre?.split(',')[0] || ''}</span>
                  </div>
                  
                  {avgRating > 0 && (
                    <div className="user-rating">
                      <span className="user-rating-label">👥 {ratingsCount} оценок</span>
                      <span className="user-rating-value">⭐ {avgRating}</span>
                    </div>
                  )}

                  <div className="movie-actions">
                    <button 
                      className={`action-btn like-btn ${isLiked ? 'active' : ''}`}
                      onClick={(e) => handleLike(e, movie.id)}
                      title={isLiked ? 'Убрать лайк' : 'Поставить лайк'}
                    >
                      {isLiked ? '❤️' : '🤍'} 
                    </button>
                    
                    <button 
                      className={`action-btn fav-btn ${isFav ? 'active' : ''}`}
                      onClick={(e) => handleFavorite(e, movie.id)}
                      title={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
                    >
                      {isFav ? '⭐' : '☆'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {selectedMovie && (
          <MovieDetail movie={selectedMovie} onClose={handleCloseDetail} />
        )}
      </div>
    </div>
  )
}

export default MovieList