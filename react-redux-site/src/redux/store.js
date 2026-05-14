import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import moviesReducer from './slices/moviesSlice'
import uiReducer from './slices/uiSlice'
import { authMiddleware } from './middleware/authMiddleware'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(authMiddleware)
})