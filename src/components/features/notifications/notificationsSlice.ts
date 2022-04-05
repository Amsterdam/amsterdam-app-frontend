import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../../store'
import {ProjectsWithSubscriptionStatus} from './types'
import {NotificationSettings} from './'

const initialState: NotificationSettings = {
  projectsEnabled: false,
  projects: {},
  readIds: [],
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    resetNotifications: () => initialState,
    setProjectsEnabled: (state, {payload}: PayloadAction<boolean>) => {
      state.projectsEnabled = payload
    },
    updateProjects: (
      state,
      {payload}: PayloadAction<ProjectsWithSubscriptionStatus>,
    ) => {
      state.projects = payload
    },
    updateReadIds: (state, {payload}) => {
      state.readIds = payload
    },
  },
})

export const {
  resetNotifications,
  setProjectsEnabled,
  updateProjects,
  updateReadIds,
} = notificationsSlice.actions

export const selectNotificationSettings = (state: RootState) =>
  state.notifications
