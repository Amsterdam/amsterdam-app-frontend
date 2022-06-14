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
    addProjects: (state, {payload: projects}: PayloadAction<string[]>) => {
      projects.forEach(projectToAdd =>
        Object.assign(state.projects, {[projectToAdd]: true}),
      )
    },
    resetNotifications: () => initialState,
    deactivateAllProjects: state => {
      Object.keys(state.projects).forEach(
        projectId => (state.projects[projectId] = false),
      )
    },
    deleteProjects: (
      state,
      {payload: projectsToDelete}: PayloadAction<string[]>,
    ) => {
      projectsToDelete.forEach(proj => {
        if (state.projects.hasOwnProperty(proj)) {
          delete state.projects[proj]
        }
      })
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
    addReadId: (state, {payload: articleId}: PayloadAction<string>) => {
      state.readIds.push(articleId)
    },
    deleteReadId: (state, {payload: articleId}: PayloadAction<string>) => {
      state.readIds = state.readIds.filter(id => id !== articleId)
    },
  },
})

export const {
  addProjects,
  deactivateAllProjects,
  deleteProjects,
  deleteReadId,
  resetNotifications,
  toggleProject,
  toggleProjectsEnabled,
  addReadId,
} = notificationsSlice.actions

export const selectNotificationSettings = (state: RootState) =>
  state.notifications
