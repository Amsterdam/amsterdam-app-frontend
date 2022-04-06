import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../../store'
import {NotificationSettings} from './'

const initialState: NotificationSettings = {
  projectsEnabled: true,
  projects: {},
  readIds: [],
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    resetNotifications: () => initialState,
    deactivateAllProjects: state => {
      Object.keys(state.projects).forEach(
        projectId => (state.projects[projectId] = false),
      )
    },
    toggleProject: (state, {payload: id}: PayloadAction<string>) => {
      const isSubscribedProject = state.projects.hasOwnProperty(id)
      if (isSubscribedProject) {
        const isSubscriptionActive = state.projects[id]
        state.projects[id] = isSubscriptionActive ? false : true
      } else {
        Object.assign(state.projects, {[id]: true})
      }
    },
    toggleProjectsEnabled: state => {
      state.projectsEnabled = !state.projectsEnabled
    },
    updateReadIds: (state, {payload}) => {
      state.readIds = payload
    },
  },
})

export const {
  deactivateAllProjects,
  resetNotifications,
  toggleProject,
  toggleProjectsEnabled,
  updateReadIds,
} = notificationsSlice.actions

export const selectNotificationSettings = (state: RootState) =>
  state.notifications
