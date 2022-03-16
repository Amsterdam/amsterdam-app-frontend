import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../../../store'

type ProjectsSearchState = {
  isSearching: boolean
}

export const projectsSearchSlice = createSlice({
  name: 'projectsSearch',
  initialState: {isSearching: false} as ProjectsSearchState,
  reducers: {
    setIsSearching: (state, {payload: isSearching}: PayloadAction<boolean>) => {
      state.isSearching = isSearching
    },
  },
})

export const {setIsSearching} = projectsSearchSlice.actions

export const selectIsProjectsSearching = (state: RootState) =>
  state.projectsSearch.isSearching
