import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  movies: [],
  currentMovie: null,
  loading: false,
  error: null,
  likes: JSON.parse(localStorage.getItem('likes') || '{}'),      // { movieId: true/false }
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'), // [movieId, movieId]
  ratings: JSON.parse(localStorage.getItem('ratings') || '{}')     // { movieId: [5,4,5] }
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // Базовые CRUD операции
    setMovies: (state, action) => {
      state.movies = action.payload
    },
    setCurrentMovie: (state, action) => {
      state.currentMovie = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    addMovie: (state, action) => {
      state.movies.push(action.payload)
    },
    updateMovie: (state, action) => {
      const index = state.movies.findIndex(m => m.id === action.payload.id)
      if (index !== -1) {
        state.movies[index] = action.payload
      }
    },
    deleteMovie: (state, action) => {
      state.movies = state.movies.filter(m => m.id !== action.payload)
    },

    // 1. LIKE / DISLIKE
    toggleLike: (state, action) => {
      const movieId = action.payload
      state.likes[movieId] = !state.likes[movieId]
      localStorage.setItem('likes', JSON.stringify(state.likes))
    },

    // 2. ИЗБРАННОЕ
    toggleFavorite: (state, action) => {
      const movieId = action.payload
      if (state.favorites.includes(movieId)) {
        state.favorites = state.favorites.filter(id => id !== movieId)
      } else {
        state.favorites.push(movieId)
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },

    // 3. ДОБАВЛЕНИЕ ОЦЕНКИ
    addRating: (state, action) => {
      const { movieId, rating } = action.payload
      if (!state.ratings[movieId]) {
        state.ratings[movieId] = []
      }
      state.ratings[movieId].push(rating)
      localStorage.setItem('ratings', JSON.stringify(state.ratings))
    },

    // 4. УДАЛЕНИЕ ОЦЕНКИ
    removeRating: (state, action) => {
      const { movieId, ratingIndex } = action.payload
      if (state.ratings[movieId]) {
        state.ratings[movieId].splice(ratingIndex, 1)
        localStorage.setItem('ratings', JSON.stringify(state.ratings))
      }
    },

    // Очистка всех оценок для фильма
    clearRatings: (state, action) => {
      const movieId = action.payload
      delete state.ratings[movieId]
      localStorage.setItem('ratings', JSON.stringify(state.ratings))
    }
  }
})

// Селекторы для получения данных
export const selectMovieLikes = (state, movieId) => state.movies.likes[movieId] || false
export const selectIsFavorite = (state, movieId) => state.movies.favorites.includes(movieId)
export const selectMovieRatings = (state, movieId) => state.movies.ratings[movieId] || []
export const selectAverageRating = (state, movieId) => {
  const ratings = state.movies.ratings[movieId] || []
  if (ratings.length === 0) return 0
  const sum = ratings.reduce((a, b) => a + b, 0)
  return (sum / ratings.length).toFixed(1)
}
export const selectRatingsCount = (state, movieId) => (state.movies.ratings[movieId] || []).length

export const {
  setMovies,
  setCurrentMovie,
  setLoading,
  setError,
  addMovie,
  updateMovie,
  deleteMovie,
  toggleLike,
  toggleFavorite,
  addRating,
  removeRating,
  clearRatings
} = movieSlice.actions

export default movieSlice.reducer