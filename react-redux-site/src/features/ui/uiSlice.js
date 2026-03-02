import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'dark' 
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {

  },
})

export default uiSlice.reducer