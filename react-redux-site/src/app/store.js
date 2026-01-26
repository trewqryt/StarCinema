import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import movieReducer from '../features/movies/movieSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    movies: movieReducer,
  },
});