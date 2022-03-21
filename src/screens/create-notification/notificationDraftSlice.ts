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
  isStepperVisible: boolean
  mainImage: Image | undefined
  mainImageDescription: string
  newsArticle?: NewsArticleMinimal
  notification: NotificationQueryArg | undefined
  project: ProjectMinimal | undefined
  projectWarning: NewProjectWarning | undefined
  responseStatus: ResponseStatus | undefined
  step: number
  totalSteps: number
}

const initialState: NotificationDraft = {
  isStepperVisible: true,
  mainImage: undefined,
  mainImageDescription: '',
  newsArticle: undefined,
  notification: undefined,
  project: undefined,
  projectWarning: undefined,
  responseStatus: undefined,
  step: 1,
  totalSteps: 3,
}

export const notificationDraftSlice = createSlice({
  name: 'notificationDraft',
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
    setStep: (state, {payload: step}: PayloadAction<number>) => {
      state.step = step <= state.totalSteps ? step : state.totalSteps
    },
    setStepperVisibility: (
      state,
      {payload: visibility}: PayloadAction<boolean>,
    ) => {
      state.isStepperVisible = visibility
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
  setResponseStatus,
  setStep,
  setStepperVisibility,
} = notificationDraftSlice.actions

export const selectMainImage = createSelector(
  (state: RootState) => state.notificationDraft,
  (notificationDraft: NotificationDraft) => notificationDraft?.mainImage,
)

export const selectMainImageDescription = createSelector(
  (state: RootState) => state.notificationDraft,
  (notificationDraft: NotificationDraft) =>
    notificationDraft?.mainImageDescription,
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

export const selectStepperVisibility = createSelector(
  (state: RootState) => state.notificationDraft,
  (notificationDraft: NotificationDraft) => notificationDraft?.isStepperVisible,
)

export const selectTotalSteps = createSelector(
  (state: RootState) => state.notificationDraft,
  (notificationDraft: NotificationDraft) => notificationDraft?.totalSteps,
)
