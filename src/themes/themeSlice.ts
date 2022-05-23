import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {darkTheme, darkThemeId, lightTheme, lightThemeId} from './'

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: {theme: lightTheme},
  reducers: {
    toggleTheme: state => {
      const {theme} = state
      if (theme.id === lightThemeId) {
        state.theme = darkTheme
      }

      if (theme.id === darkThemeId) {
        state.theme = lightTheme
      }
    },
  },
})

export const {toggleTheme} = themeSlice.actions

export const selectTheme = (state: RootState) => state.theme
