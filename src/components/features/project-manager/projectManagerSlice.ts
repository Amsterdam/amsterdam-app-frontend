import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../../store'
import {ProjectManager} from './types'

const initialState: ProjectManager = {
  id: '',
  projects: [],
}

export const projectManagerSlice = createSlice({
  name: 'projectManager',
  initialState,
  reducers: {
    addProjectManagerId: (state, {payload: id}: PayloadAction<string>) => {
      state.id = id
    },
    addProjectManagerProjects: (
      state,
      {payload: projects}: PayloadAction<string[]>,
    ) => {
      state.projects = projects
    },
    removeProjectManager: () => initialState,
  },
})

export const {
  addProjectManagerId,
  addProjectManagerProjects,
  removeProjectManager,
} = projectManagerSlice.actions

export const selectProjectManager = (state: RootState) => state.projectManager
