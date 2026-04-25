import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  movies: [],
  currentMovie: null,
  loading: false,
  error: null,
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
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
  },
})

export const { 
  setMovies, 
  setCurrentMovie, 
  setLoading, 
  setError,
  addMovie,
  updateMovie,
  deleteMovie
} = movieSlice.actions

export default movieSlice.reducer