import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    searchQuery: '',
    filterGenre: 'all',
    sortBy: 'rating',
    theme: localStorage.getItem('theme') || 'dark'
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setFilterGenre: (state, action) => {
      state.filterGenre = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', state.theme)
      document.body.className = state.theme === 'dark' ? 'dark-theme' : 'light-theme'
    }
  }
})

export const { setSearchQuery, setFilterGenre, setSortBy, toggleTheme } = uiSlice.actions
export default uiSlice.reducer