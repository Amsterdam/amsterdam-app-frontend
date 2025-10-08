import {createSlice} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'
import {type Themes, themes} from '@/themes/themes'

export type ThemeState = {theme: Themes}

export const themeSlice = createSlice({
  name: ReduxKey.theme,
  initialState: {theme: 'light'},
  reducers: {},
})

export const selectTheme = (state: RootState) =>
  themes[state[ReduxKey.theme].theme]
