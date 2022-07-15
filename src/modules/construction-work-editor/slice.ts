import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ProjectManager} from '@/modules/construction-work-editor/types'
import {RootState} from '@/store'

const initialState: ProjectManager = {
  id: '',
  projects: [],
}

export const constructionWorkEditorSlice = createSlice({
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
} = constructionWorkEditorSlice.actions

export const selectProjectManager = (state: RootState) => state.projectManager
