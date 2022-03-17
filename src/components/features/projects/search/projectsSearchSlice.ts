import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../../../store'

type ProjectsSearchState = {
  isSearching: boolean
  searchText: string
}

export const projectsSearchSlice = createSlice({
  name: 'projectsSearch',
  initialState: {isSearching: false} as ProjectsSearchState,
  reducers: {
    setIsSearching: (state, {payload: isSearching}: PayloadAction<boolean>) => {
      state.isSearching = isSearching
    },
    setSearchText: (state, {payload: searchText}: PayloadAction<string>) => {
      state.searchText = searchText
    },
  },
})

export const {setIsSearching, setSearchText} = projectsSearchSlice.actions

export const selectIsProjectsSearching = (state: RootState) =>
  state.projectsSearch.isSearching

export const selectProjectSearchText = (state: RootState) =>
  state.projectsSearch.searchText
