import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Image} from 'react-native-image-crop-picker'
import {RootState} from '../../store'
import {
  NewProjectWarning,
  NotificationQueryArg,
  ResponseStatus,
} from '../../types'

type ProjectMinimal = {id: string; title: string}

type NewsArticleMinimal = {
  id: string
  title: string
}

export type NotificationDraft = {
  mainImage: Image | undefined
  newsArticle?: NewsArticleMinimal
  notification: NotificationQueryArg | undefined
  project: ProjectMinimal | undefined
  projectWarning: NewProjectWarning | undefined
  responseStatus: ResponseStatus | undefined
  step: number | null
  totalSteps: number
}

const initialState: NotificationDraft = {
  mainImage: undefined,
  newsArticle: undefined,
  notification: undefined,
  project: undefined,
  projectWarning: undefined,
  responseStatus: undefined,
  step: 1,
  totalSteps: 4,
}

export const notificationDraftSlice = createSlice({
  name: 'notificationDraft',
  initialState: initialState,
  reducers: {
    setMainImage: (state, {payload: mainImage}: PayloadAction<Image>) => {
      state.mainImage = mainImage
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
    setProject: (state, {payload: project}: PayloadAction<ProjectMinimal>) => {
      state.project = project
    },
    setProjectWarning: (
      state,
      {payload: projectWarning}: PayloadAction<NewProjectWarning>,
    ) => {
      state.projectWarning = projectWarning
    },
    setResponseStatus: (
      state,
      {payload: responseStatus}: PayloadAction<ResponseStatus>,
    ) => {
      state.responseStatus = responseStatus
    },
    setStep: (state, {payload: step}: PayloadAction<number | null>) => {
      state.step = step
    },
  },
})

export const {
  setMainImage,
  setNewsArticle,
  setNotification,
  setProject,
  setProjectWarning,
  setResponseStatus,
  setStep,
} = notificationDraftSlice.actions

export const selectMainImage = createSelector(
  (state: RootState) => state.notificationDraft,
  (notificationDraft: NotificationDraft) => notificationDraft?.mainImage,
)

export const selectNewsArticle = createSelector(
  (state: RootState) => state.notificationDraft,
  (notificationDraft: NotificationDraft) => notificationDraft?.newsArticle,
)

export const selectNotification = createSelector(
  (state: RootState) => state.notificationDraft,
  (notificationDraft: NotificationDraft) => notificationDraft?.notification,
)

export const selectProject = createSelector(
  (state: RootState) => state.notificationDraft,
  (notificationDraft: NotificationDraft) => notificationDraft?.project,
)

export const selectProjectId = createSelector(
  (state: RootState) => state.notificationDraft,
  (notificationDraft: NotificationDraft) => notificationDraft?.project?.id,
)

export const selectProjectWarning = createSelector(
  (state: RootState) => state.notificationDraft,
  (notificationDraft: NotificationDraft) => notificationDraft?.projectWarning,
)

export const selectResponseStatus = createSelector(
  (state: RootState) => state.notificationDraft,
  (notificationDraft: NotificationDraft) => notificationDraft?.responseStatus,
)

export const selectStep = createSelector(
  (state: RootState) => state.notificationDraft,
  (notificationDraft: NotificationDraft) => notificationDraft?.step,
)

export const selectTotalSteps = createSelector(
  (state: RootState) => state.notificationDraft,
  (notificationDraft: NotificationDraft) => notificationDraft?.totalSteps,
)
