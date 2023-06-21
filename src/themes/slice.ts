import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '@/store'
import {Theme, lightTheme} from '@/themes/themes'

export type ThemeState = {theme: Theme}

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: {theme: lightTheme},
  reducers: {},
})

export const selectTheme = (state: RootState) => state.theme
