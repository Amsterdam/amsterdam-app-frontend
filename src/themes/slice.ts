import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '@/store'
import {lightTheme} from '@/themes/themes'

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: {theme: lightTheme},
  reducers: {},
})

export const selectTheme = (state: RootState) => state.theme
