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
  },
})

export const { setMovies, setCurrentMovie, setLoading, setError } = movieSlice.actions
export default movieSlice.reducer