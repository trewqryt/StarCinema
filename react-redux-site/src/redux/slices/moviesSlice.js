import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import moviesData from '../../data/movies.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  await delay(800)
  const savedMovies = localStorage.getItem('userMovies')
  const userMovies = savedMovies ? JSON.parse(savedMovies) : []
  return [...moviesData.movies, ...userMovies]
})

export const addMovie = createAsyncThunk('movies/addMovie', async (movieData) => {
  await delay(500)
  const newMovie = { ...movieData, id: Date.now() }
  const savedMovies = localStorage.getItem('userMovies')
  const userMovies = savedMovies ? JSON.parse(savedMovies) : []
  userMovies.push(newMovie)
  localStorage.setItem('userMovies', JSON.stringify(userMovies))
  return newMovie
})

export const updateMovie = createAsyncThunk('movies/updateMovie', async ({ id, movieData }) => {
  await delay(500)
  const updatedMovie = { ...movieData, id: parseInt(id) }
  const savedMovies = localStorage.getItem('userMovies')
  const userMovies = savedMovies ? JSON.parse(savedMovies) : []
  const index = userMovies.findIndex(m => m.id === parseInt(id))
  if (index !== -1) {
    userMovies[index] = updatedMovie
    localStorage.setItem('userMovies', JSON.stringify(userMovies))
  }
  return updatedMovie
})

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  await delay(500)
  const savedMovies = localStorage.getItem('userMovies')
  const userMovies = savedMovies ? JSON.parse(savedMovies) : []
  const filtered = userMovies.filter(m => m.id !== parseInt(id))
  localStorage.setItem('userMovies', JSON.stringify(filtered))
  return id
})

const getInitialMovies = () => {
  const savedMovies = localStorage.getItem('userMovies')
  const userMovies = savedMovies ? JSON.parse(savedMovies) : []
  return [...moviesData.movies, ...userMovies]
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: getInitialMovies(),
    loading: false,
    error: null,
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    likes: JSON.parse(localStorage.getItem('likes') || '{}'),
    ratings: JSON.parse(localStorage.getItem('ratings') || '{}')
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id)
      } else {
        state.favorites.push(id)
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    toggleLike: (state, action) => {
      const id = action.payload
      state.likes[id] = !state.likes[id]
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
        state.error = action.error.message
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload)
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(m => m.id === action.payload.id)
        if (index !== -1) {
          state.movies[index] = action.payload
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(m => m.id !== action.payload)
      })
  }
})

export const { toggleFavorite, toggleLike, addRating, removeRating } = moviesSlice.actions
export default moviesSlice.reducer