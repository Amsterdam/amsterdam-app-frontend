import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ProjectManager} from '@/modules/construction-work-editor/types'
import {RootState} from '@/store'

const initialState: ProjectManager = {
  id: '',
  hasSeenWelcomeMessage: false,
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
    setHasSeenWelcomeMessage: state => {
      state.hasSeenWelcomeMessage = true
    },
    removeProjectManager: () => initialState,
  },
})

export const {
  addProjectManagerId,
  addProjectManagerProjects,
  setHasSeenWelcomeMessage,
  removeProjectManager,
} = constructionWorkEditorSlice.actions

export const selectProjectManagerId = ({projectManager}: RootState) =>
  projectManager.id
export const selectProjectManagerHasSeenWelcomeMessage = ({
  projectManager,
}: RootState) => projectManager.hasSeenWelcomeMessage
export const selectProjectManagerProjects = ({projectManager}: RootState) =>
  projectManager.projects
