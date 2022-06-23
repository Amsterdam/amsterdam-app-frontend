import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store'

type ProjectsSearchState = {
  isSearching: boolean
  searchText: string
}

export const projectsByTextSlice = createSlice({
  name: 'projectsSearch',
  initialState: {isSearching: false, searchText: ''} as ProjectsSearchState,
  reducers: {
    setIsSearching: (state, {payload: isSearching}: PayloadAction<boolean>) => {
      state.isSearching = isSearching
    },
    setSearchText: (state, {payload: searchText}: PayloadAction<string>) => {
      state.searchText = searchText
    },
  },
})

export const {setIsSearching, setSearchText} = projectsByTextSlice.actions

export const selectIsProjectsSearching = (state: RootState) =>
  state.projectsSearch.isSearching

export const selectProjectSearchText = (state: RootState) =>
  state.projectsSearch.searchText
