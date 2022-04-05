import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../../store'
import {ProjectManager} from './types'

const initialState: ProjectManager = {
  id: '',
}

export const projectManagerSlice = createSlice({
  name: 'projectManager',
  initialState,
  reducers: {
    addProjectManager: (state, {payload}: PayloadAction<ProjectManager>) =>
      (state = payload),
    removeProjectManager: () => initialState,
  },
})

export const {addProjectManager, removeProjectManager} =
  projectManagerSlice.actions

export const selectProjectManager = (state: RootState) => state.projectManager
