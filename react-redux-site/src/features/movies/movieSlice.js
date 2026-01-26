import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [
    { id: 1, title: 'Inception', year: 2010, genre: 'Sci-Fi' },
    { id: 2, title: 'The Matrix', year: 1999, genre: 'Action' },
    { id: 3, title: 'Interstellar', year: 2014, genre: 'Adventure' },
    { id: 4, title: 'Pulp Fiction', year: 1994, genre: 'Crime' },
  ],
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
});

export default movieSlice.reducer;