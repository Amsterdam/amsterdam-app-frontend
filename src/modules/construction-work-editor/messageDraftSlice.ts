import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Image} from 'react-native-image-crop-picker'
import {NewMessage} from '@/modules/construction-work/types'
import {RootState} from '@/store'
import {NotificationQueryArg} from '@/types'

export type ProjectIdAndTitle = {id: string; title: string}

export type MessageDraft = {
  mainImage: Image | undefined
  mainImageDescription: string
  notification: NotificationQueryArg | undefined
  project: ProjectIdAndTitle | undefined
  message: NewMessage | undefined
}

const initialState: MessageDraft = {
  mainImage: undefined,
  mainImageDescription: '',
  notification: undefined,
  project: undefined,
  message: undefined,
}

export const messageDraftSlice = createSlice({
  name: 'messageDraft',
  initialState: initialState,
  reducers: {
    clearDraft: () => initialState,
    setMainImage: (
      state,
      {payload: mainImage}: PayloadAction<Image | undefined>,
    ) => {
      state.mainImage = mainImage
    },
    setMainImageDescription: (
      state,
      {payload: mainImageDescription}: PayloadAction<string>,
    ) => {
      state.mainImageDescription = mainImageDescription
    },
    setNotification: (
      state,
      {payload: notification}: PayloadAction<NotificationQueryArg>,
    ) => {
      state.notification = notification
    },
    setProject: (
      state,
      {payload: project}: PayloadAction<ProjectIdAndTitle>,
    ) => {
      state.project = project
    },
    setMessage: (state, {payload: message}: PayloadAction<NewMessage>) => {
      state.message = message
    },
  },
})

export const {
  clearDraft,
  setMainImage,
  setMainImageDescription,
  setNotification,
  setProject,
  setMessage,
} = messageDraftSlice.actions

export const selectMainImage = createSelector(
  (state: RootState) => state.messageDraft,
  (messageDraft: MessageDraft) => messageDraft?.mainImage,
)

export const selectMainImageDescription = createSelector(
  (state: RootState) => state.messageDraft,
  (messageDraft: MessageDraft) => messageDraft?.mainImageDescription,
)

export const selectNotification = createSelector(
  (state: RootState) => state.messageDraft,
  (messageDraft: MessageDraft) => messageDraft?.notification,
)

export const selectProject = createSelector(
  (state: RootState) => state.messageDraft,
  (messageDraft: MessageDraft) => messageDraft?.project,
)

export const selectProjectId = createSelector(
  (state: RootState) => state.messageDraft,
  (messageDraft: MessageDraft) => messageDraft?.project?.id,
)

export const selectMessage = createSelector(
  (state: RootState) => state.messageDraft,
  (messageDraft: MessageDraft) => messageDraft?.message,
)
