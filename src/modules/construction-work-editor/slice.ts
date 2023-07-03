import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ConstructionWorkEditor} from '@/modules/construction-work-editor/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type ConstructionWorkEditorState = ConstructionWorkEditor

const initialState: ConstructionWorkEditorState = {
  id: undefined,
  hasSeenWelcomeMessage: false,
}

export const constructionWorkEditorSlice = createSlice({
  name: ReduxKey.constructionWorkEditor,
  initialState,
  reducers: {
    addConstructionWorkEditorId: (
      state,
      {payload: id}: PayloadAction<string>,
    ) => {
      state.id = id
    },
    setHasSeenWelcomeMessage: (
      state,
      {payload: hasSeen}: PayloadAction<boolean>,
    ) => {
      state.hasSeenWelcomeMessage = hasSeen
    },
    removeConstructionWorkEditor: () => initialState,
  },
})

export const {
  addConstructionWorkEditorId,
  setHasSeenWelcomeMessage,
  removeConstructionWorkEditor,
} = constructionWorkEditorSlice.actions

export const selectConstructionWorkEditorId = (state: RootState) =>
  state[ReduxKey.constructionWorkEditor].id

export const selectConstructionWorkEditorHasSeenWelcomeMessage = (
  state: RootState,
) => state[ReduxKey.constructionWorkEditor].hasSeenWelcomeMessage
