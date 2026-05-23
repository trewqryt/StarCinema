import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './slices/moviesSlice'
import uiReducer from './slices/uiSlice'
import authReducer from './slices/authSlice'
import { authMiddleware } from './middleware/authMiddleware'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    ui: uiReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(authMiddleware)
})