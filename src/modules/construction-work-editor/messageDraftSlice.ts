import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Image} from 'react-native-image-crop-picker'
import {NewProjectWarning} from '@/modules/construction-work/types'
import {RootState} from '@/store'
import {NotificationQueryArg} from '@/types'

export type ProjectIdAndTitle = {id: string; title: string}

type NewsArticleMinimal = {
  id: string
  title: string
}

export type MessageDraft = {
  mainImage: Image | undefined
  mainImageDescription: string
  newsArticle?: NewsArticleMinimal
  notification: NotificationQueryArg | undefined
  project: ProjectIdAndTitle | undefined
  projectWarning: NewProjectWarning | undefined
}

const initialState: MessageDraft = {
  mainImage: undefined,
  mainImageDescription: '',
  newsArticle: undefined,
  notification: undefined,
  project: undefined,
  projectWarning: undefined,
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
    setNewsArticle: (
      state,
      {payload: newsArticle}: PayloadAction<NewsArticleMinimal>,
    ) => {
      state.newsArticle = newsArticle
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
    setProjectWarning: (
      state,
      {payload: projectWarning}: PayloadAction<NewProjectWarning>,
    ) => {
      state.projectWarning = projectWarning
    },
  },
})

export const {
  clearDraft,
  setMainImage,
  setMainImageDescription,
  setNewsArticle,
  setNotification,
  setProject,
  setProjectWarning,
} = messageDraftSlice.actions

export const selectMainImage = createSelector(
  (state: RootState) => state.messageDraft,
  (messageDraft: MessageDraft) => messageDraft?.mainImage,
)

export const selectMainImageDescription = createSelector(
  (state: RootState) => state.messageDraft,
  (messageDraft: MessageDraft) => messageDraft?.mainImageDescription,
)

export const selectNewsArticle = createSelector(
  (state: RootState) => state.messageDraft,
  (messageDraft: MessageDraft) => messageDraft?.newsArticle,
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

export const selectProjectWarning = createSelector(
  (state: RootState) => state.messageDraft,
  (messageDraft: MessageDraft) => messageDraft?.projectWarning,
)
