import {createSlice} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'
import {themes} from '@/themes/themes'

export type ThemeState = {theme: keyof typeof themes}

export const themeSlice = createSlice({
  name: ReduxKey.theme,
  initialState: {theme: 'light'},
  reducers: {},
})

export const selectTheme = (state: RootState) =>
  themes[state[ReduxKey.theme].theme]
