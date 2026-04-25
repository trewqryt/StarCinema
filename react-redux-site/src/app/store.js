import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice'
import movieReducer from '../features/movies/movieSlice'
import authReducer from '../features/auth/authSlice'
import { authMiddleware } from '../middleware/authMiddleware'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    movies: movieReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware)
})