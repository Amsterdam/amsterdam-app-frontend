import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ConstructionWorkEditor} from '@/modules/construction-work-editor/types'
import {RootState} from '@/store'

const initialState: ConstructionWorkEditor = {
  id: undefined,
  hasSeenWelcomeMessage: false,
  projects: [],
}

export const constructionWorkEditorSlice = createSlice({
  name: 'constructionWorkEditor',
  initialState,
  reducers: {
    addConstructionWorkEditorId: (
      state,
      {payload: id}: PayloadAction<string>,
    ) => {
      state.id = id
    },
    addConstructionWorkEditorProjects: (
      state,
      {payload: projects}: PayloadAction<string[]>,
    ) => {
      state.projects = projects
    },
    setHasSeenWelcomeMessage: state => {
      state.hasSeenWelcomeMessage = true
    },
    removeConstructionWorkEditor: () => initialState,
  },
})

export const {
  addConstructionWorkEditorId,
  addConstructionWorkEditorProjects,
  setHasSeenWelcomeMessage,
  removeConstructionWorkEditor,
} = constructionWorkEditorSlice.actions

export const selectConstructionWorkEditorId = ({
  constructionWorkEditor,
}: RootState) => constructionWorkEditor.id
export const selectConstructionWorkEditorHasSeenWelcomeMessage = ({
  constructionWorkEditor,
}: RootState) => constructionWorkEditor.hasSeenWelcomeMessage
export const selectConstructionWorkEditorProjects = ({
  constructionWorkEditor,
}: RootState) => constructionWorkEditor.projects
