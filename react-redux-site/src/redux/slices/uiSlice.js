import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: localStorage.getItem('theme') || 'dark',
  sidebarOpen: false,
  searchQuery: '',
  filterGenre: 'all',
  sortBy: 'rating'
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', state.theme)
      document.body.className = state.theme === 'dark' ? 'dark-theme' : 'light-theme'
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setFilterGenre: (state, action) => {
      state.filterGenre = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    }
  }
})

export const { toggleTheme, toggleSidebar, setSearchQuery, setFilterGenre, setSortBy } = uiSlice.actions
export default uiSlice.reducer