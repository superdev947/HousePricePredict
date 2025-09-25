// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: true,
  lang: 'en'
}

const setting = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload
    },
    setLang(state, action) {
      state.lang = action.payload
    }
  }
})

export default setting.reducer

export const { setTheme, setLang } = setting.actions
