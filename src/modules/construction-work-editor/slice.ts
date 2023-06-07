import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ConstructionWorkEditor} from '@/modules/construction-work-editor/types'
import {RootState} from '@/store'

const initialState: ConstructionWorkEditor = {
  id: undefined,
  hasSeenWelcomeMessage: false,
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
    setHasSeenWelcomeMessage: state => {
      state.hasSeenWelcomeMessage = true
    },
    removeConstructionWorkEditor: () => initialState,
  },
})

export const {
  addConstructionWorkEditorId,
  setHasSeenWelcomeMessage,
  removeConstructionWorkEditor,
} = constructionWorkEditorSlice.actions

export const selectConstructionWorkEditorId = ({
  constructionWorkEditor,
}: RootState) => constructionWorkEditor.id
export const selectConstructionWorkEditorHasSeenWelcomeMessage = ({
  constructionWorkEditor,
}: RootState) => constructionWorkEditor.hasSeenWelcomeMessage
