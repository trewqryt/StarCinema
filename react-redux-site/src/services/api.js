import axios from 'axios'

// Используем JSONPlaceholder + наш локальный API
const API_URL = 'https://jsonplaceholder.typicode.com'

// Моковые данные для фильмов
const mockMovies = [
  { id: 1, title: "Дюна: Часть вторая", year: 2024, rating: 8.9, genre: "Фантастика", director: "Дени Вильнёв", actors: "Тимоти Шаламе, Зендея", description: "Пол Атрейдес объединяется с фрименами, чтобы отомстить.", poster: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg", runtime: "2ч 46мин" },
  { id: 2, title: "Оппенгеймер", year: 2023, rating: 8.5, genre: "Драма", director: "Кристофер Нолан", actors: "Киллиан Мёрфи, Эмили Блант", description: "История жизни создателя атомной бомбы.", poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg", runtime: "3ч" },
  { id: 3, title: "Барби", year: 2023, rating: 7.0, genre: "Комедия", director: "Грета Гервиг", actors: "Марго Робби, Райан Гослинг", description: "Барби отправляется в реальный мир.", poster: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg", runtime: "1ч 54мин" },
  { id: 4, title: "Стражи Галактики 3", year: 2023, rating: 8.1, genre: "Фантастика", director: "Джеймс Ганн", actors: "Крис Пратт, Зои Салдана", description: "Стражи Галактики отправляются на поиски Ракеты.", poster: "https://m.media-amazon.com/images/M/MV5BOTA2NTU5MjU5NF5BMl5BanBnXkFtZTgwOTA3MDE0MDE@._V1_.jpg", runtime: "2ч 30мин" },
  { id: 5, title: "Человек-паук: Паутина вселенных", year: 2023, rating: 8.7, genre: "Мультфильм", director: "Жуакин Душ Сантуш", actors: "Шамеик Мур, Хейли Стайнфелд", description: "Майлз Моралес отправляется в мультивселенную.", poster: "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg", runtime: "2ч 20мин" }
]

let localMovies = [...mockMovies]

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
})

// Перехватчик для добавления токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Моковые API методы
export const mockApi = {
  getMovies: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { movies: localMovies, totalPages: 1 } })
      }, 500)
    })
  },
  getMovieById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const movie = localMovies.find(m => m.id === parseInt(id))
        if (movie) {
          resolve({ data: movie })
        } else {
          reject({ response: { data: { message: 'Фильм не найден' } } })
        }
      }, 300)
    })
  },
  createMovie: (movieData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMovie = { ...movieData, id: Date.now() }
        localMovies.push(newMovie)
        resolve({ data: newMovie })
      }, 500)
    })
  },
  updateMovie: (id, movieData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = localMovies.findIndex(m => m.id === parseInt(id))
        if (index !== -1) {
          localMovies[index] = { ...localMovies[index], ...movieData }
          resolve({ data: localMovies[index] })
        } else {
          reject({ response: { data: { message: 'Фильм не найден' } } })
        }
      }, 500)
    })
  },
  deleteMovie: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localMovies = localMovies.filter(m => m.id !== parseInt(id))
        resolve({ data: { success: true } })
      }, 500)
    })
  },
  login: (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            token: 'fake-jwt-token',
            user: { id: 1, name: credentials.email.split('@')[0], email: credentials.email, role: 'user' }
          }
        })
      }, 500)
    })
  },
  register: (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            token: 'fake-jwt-token',
            user: { id: Date.now(), name: userData.name, email: userData.email, role: 'user' }
          }
        })
      }, 500)
    })
  }
}

// Переопределяем методы для использования моков
api.get = async (url) => {
  if (url === '/movies') return mockApi.getMovies()
  if (url.startsWith('/movies/')) {
    const id = url.split('/')[2]
    return mockApi.getMovieById(id)
  }
  return axios.get(url)
}

api.post = async (url, data) => {
  if (url === '/movies') return mockApi.createMovie(data)
  if (url === '/auth/login') return mockApi.login(data)
  if (url === '/auth/register') return mockApi.register(data)
  return axios.post(url, data)
}

api.put = async (url, data) => {
  if (url.startsWith('/movies/')) {
    const id = url.split('/')[2]
    return mockApi.updateMovie(id, data)
  }
  return axios.put(url, data)
}

api.delete = async (url) => {
  if (url.startsWith('/movies/')) {
    const id = url.split('/')[2]
    return mockApi.deleteMovie(id)
  }
  return axios.delete(url)
}

export default api