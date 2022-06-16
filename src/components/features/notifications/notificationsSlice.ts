import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../../store'
import {NotificationSettings, ReadArticle} from './'

const initialState: NotificationSettings = {
  projectsEnabled: true,
  projects: {},
  readArticles: [],
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
    addReadArticle: (state, {payload: article}: PayloadAction<ReadArticle>) => {
      state.readArticles.push(article)
    },
    deleteReadArticle: (state, {payload: articleId}: PayloadAction<string>) => {
      state.readArticles = state.readArticles.filter(
        article => article.id !== articleId,
      )
    },
  },
})

export const {
  addProjects,
  addReadArticle,
  deactivateAllProjects,
  deleteProjects,
  deleteReadArticle,
  resetNotifications,
  toggleProject,
  toggleProjectsEnabled,
} = notificationsSlice.actions

export const selectNotificationSettings = (state: RootState) =>
  state.notifications
