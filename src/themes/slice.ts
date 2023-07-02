import {createSlice} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKeys'
import {RootState} from '@/store/types/rootState'
import {Theme, lightTheme} from '@/themes/themes'

export type ThemeState = {theme: Theme}

export const themeSlice = createSlice({
  name: ReduxKey.theme,
  initialState: {theme: lightTheme},
  reducers: {},
})

export const selectTheme = (state: RootState) => state[ReduxKey.theme]
