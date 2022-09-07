import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '@/store'
import {darkTheme, darkThemeId, lightTheme, lightThemeId} from '@/themes/themes'

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: {theme: lightTheme},
  reducers: {
    toggleTheme: state => {
      const {
        theme: {id},
      } = state

      if (id === lightThemeId) {
        state.theme = darkTheme
      }

      if (id === darkThemeId) {
        state.theme = lightTheme
      }
    },
  },
})

export const {toggleTheme} = themeSlice.actions

export const selectTheme = (state: RootState) => state.theme
