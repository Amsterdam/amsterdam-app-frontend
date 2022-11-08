import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Image} from 'react-native-image-crop-picker'
import {NewMessage} from '@/modules/construction-work-editor/types'
import {RootState} from '@/store'
import {NotificationQueryArg} from '@/types'

export type ProjectIdAndTitle = {id: string; title: string}

export type MessageDraft = {
  mainImage?: Image
  mainImageDescription?: string
  notification?: NotificationQueryArg
  project?: ProjectIdAndTitle
  message?: NewMessage
}

type MessageDraftState = Record<string, MessageDraft> & {
  currentProjectId: string
}

const initialState = {} as MessageDraftState

export const messageDraftSlice = createSlice({
  name: 'messageDraft',
  initialState,
  reducers: {
    clearDraft: () => initialState,
    setCurrentProjectId: (
      state,
      {payload: currentProjectId}: PayloadAction<string>,
    ) => {
      state.currentProjectId = currentProjectId
    },
    setMainImage: (
      state,
      {
        payload: {projectId, mainImage},
      }: PayloadAction<{projectId: string; mainImage: Image | undefined}>,
    ) => {
      state[projectId] = {
        ...state[projectId],
        mainImage,
      }
    },
    setMainImageDescription: (
      state,
      {
        payload: {projectId, mainImageDescription},
      }: PayloadAction<{
        projectId: string
        mainImageDescription: string | undefined
      }>,
    ) => {
      state[projectId] = {
        ...state[projectId],
        mainImageDescription,
      }
    },
    setNotification: (
      state,
      {
        payload: {projectId, notification},
      }: PayloadAction<{projectId: string; notification: NotificationQueryArg}>,
    ) => {
      state[projectId] = {
        ...state[projectId],
        notification,
      }
    },
    setProject: (
      state,
      {payload: project}: PayloadAction<ProjectIdAndTitle>,
    ) => {
      state[project.id] = {
        ...state[project.id],
        project,
      }
    },

    setMessage: (
      state,
      {
        payload: {projectId, message},
      }: PayloadAction<{projectId: string; message: NewMessage}>,
    ) => {
      state[projectId] = {
        ...state[projectId],
        message,
      }
    },
  },
})

export const {
  clearDraft,
  setCurrentProjectId,
  setMainImage,
  setMainImageDescription,
  setNotification,
  setProject,
  setMessage,
} = messageDraftSlice.actions

export const selectCurrentProjectId = createSelector(
  (state: RootState) => state.messageDraft,
  (messageDraft: MessageDraftState) => messageDraft?.currentProjectId,
)

export const selectMainImage = (id: string) =>
  createSelector(
    (state: RootState) => state.messageDraft,
    (messageDraft: MessageDraftState) => messageDraft[id]?.mainImage,
  )

export const selectMainImageDescription = (id: string) =>
  createSelector(
    (state: RootState) => state.messageDraft,
    (messageDraft: MessageDraftState) => messageDraft[id]?.mainImageDescription,
  )

export const selectNotification = (id: string) =>
  createSelector(
    (state: RootState) => state.messageDraft,
    (messageDraft: MessageDraftState) => messageDraft[id]?.notification,
  )

export const selectProject = (id: string) =>
  createSelector(
    (state: RootState) => state.messageDraft,
    (messageDraft: MessageDraftState) => messageDraft[id]?.project,
  )

export const selectProjectId = createSelector(
  (state: RootState) => state.messageDraft,
  (messageDraft: MessageDraftState) => messageDraft.currentProjectId,
)

export const selectMessage = (id: string) =>
  createSelector(
    (state: RootState) => state.messageDraft,
    (messageDraft: MessageDraftState) => messageDraft[id]?.message,
  )
