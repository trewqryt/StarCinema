import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const saved = localStorage.getItem('movies')
          if (saved) {
            resolve(JSON.parse(saved))
          } else {
            const defaultMovies = [
              { id: 1, title: "Дюна: Часть вторая", year: 2024, rating: 8.9, genre: "Фантастика", director: "Дени Вильнёв", actors: "Тимоти Шаламе, Зендея", description: "Пол Атрейдес объединяется с фрименами", poster: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg", runtime: "2ч 46мин" },
              { id: 2, title: "Оппенгеймер", year: 2023, rating: 8.5, genre: "Драма", director: "Кристофер Нолан", actors: "Киллиан Мёрфи, Эмили Блант", description: "История создателя атомной бомбы", poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg", runtime: "3ч" },
              { id: 3, title: "Барби", year: 2023, rating: 7.0, genre: "Комедия", director: "Грета Гервиг", actors: "Марго Робби, Райан Гослинг", description: "Барби отправляется в реальный мир", poster: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg", runtime: "1ч 54мин" }
            ]
            resolve(defaultMovies)
          }
        }, 500)
      })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id, { rejectWithValue }) => {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const saved = localStorage.getItem('movies')
          const movies = saved ? JSON.parse(saved) : []
          const movie = movies.find(m => m.id === parseInt(id))
          if (movie) {
            resolve(movie)
          } else {
            reject('Фильм не найден')
          }
        }, 300)
      })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createMovie = createAsyncThunk(
  'movies/createMovie',
  async (movieData, { rejectWithValue }) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const saved = localStorage.getItem('movies')
          const movies = saved ? JSON.parse(saved) : []
          const newMovie = { ...movieData, id: Date.now() }
          movies.push(newMovie)
          localStorage.setItem('movies', JSON.stringify(movies))
          resolve(newMovie)
        }, 500)
      })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateMovie = createAsyncThunk(
  'movies/updateMovie',
  async ({ id, movieData }, { rejectWithValue }) => {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const saved = localStorage.getItem('movies')
          const movies = saved ? JSON.parse(saved) : []
          const index = movies.findIndex(m => m.id === parseInt(id))
          if (index !== -1) {
            movies[index] = { ...movies[index], ...movieData, id: parseInt(id) }
            localStorage.setItem('movies', JSON.stringify(movies))
            resolve(movies[index])
          } else {
            reject('Фильм не найден')
          }
        }, 500)
      })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (id, { rejectWithValue }) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const saved = localStorage.getItem('movies')
          const movies = saved ? JSON.parse(saved) : []
          const filtered = movies.filter(m => m.id !== parseInt(id))
          localStorage.setItem('movies', JSON.stringify(filtered))
          resolve(id)
        }, 500)
      })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  movies: [],
  currentMovie: null,
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  likes: JSON.parse(localStorage.getItem('likes') || '{}'),
  ratings: JSON.parse(localStorage.getItem('ratings') || '{}'),
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movieId = action.payload
      if (state.favorites.includes(movieId)) {
        state.favorites = state.favorites.filter(id => id !== movieId)
      } else {
        state.favorites.push(movieId)
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    toggleLike: (state, action) => {
      const movieId = action.payload
      state.likes[movieId] = !state.likes[movieId]
      localStorage.setItem('likes', JSON.stringify(state.likes))
    },
    addRating: (state, action) => {
      const { movieId, rating } = action.payload
      if (!state.ratings[movieId]) {
        state.ratings[movieId] = []
      }
      state.ratings[movieId].push(rating)
      localStorage.setItem('ratings', JSON.stringify(state.ratings))
    },
    removeRating: (state, action) => {
      const { movieId, index } = action.payload
      if (state.ratings[movieId]) {
        state.ratings[movieId].splice(index, 1)
        localStorage.setItem('ratings', JSON.stringify(state.ratings))
      }
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false
        state.movies = action.payload
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false
        state.currentMovie = action.payload
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload)
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(m => m.id === action.payload.id)
        if (index !== -1) {
          state.movies[index] = action.payload
        }
        if (state.currentMovie?.id === action.payload.id) {
          state.currentMovie = action.payload
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(m => m.id !== action.payload)
        if (state.currentMovie?.id === action.payload) {
          state.currentMovie = null
        }
      })
  }
})

export const { toggleFavorite, toggleLike, addRating, removeRating, clearError } = moviesSlice.actions
export default moviesSlice.reducer