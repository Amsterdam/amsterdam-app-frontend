import {StackNavigationRoutes} from '../../app/navigation'
import {ProjectBody} from '../../types'
import {
  AuthorizedProjectsScreen,
  ProjectBodyScreen,
  ProjectManagerScreen,
  ProjectNewsScreen,
  ProjectScreen,
  ProjectsScreen,
  ProjectWarningScreen,
} from './screens'
import {
  CreateNotificationScreen,
  ProjectIdAndTitle,
} from './screens/create-notification'

export enum ProjectsRouteName {
  authorizedProjects = 'AuthorizedProjects',
  projects = 'Projects',
  createNotification = 'CreateNotification',
  project = 'Project',
  projectBody = 'ProjectBody',
  projectManager = 'ProjectManager',
  projectNews = 'ProjectNews',
  projectWarning = 'ProjectWarning',
}

export type ProjectsStackParams = {
  [ProjectsRouteName.authorizedProjects]: {projectManagerId: string}
  [ProjectsRouteName.createNotification]: {project: ProjectIdAndTitle}
  [ProjectsRouteName.projects]: undefined
  [ProjectsRouteName.project]: {id: string}
  [ProjectsRouteName.projectBody]: {
    body: ProjectBody
    headerTitle: string
  }
  [ProjectsRouteName.projectManager]: {id: string}
  [ProjectsRouteName.projectNews]: {id: string}
  [ProjectsRouteName.projectWarning]: {id: string}
}

export const projectsRoutes: StackNavigationRoutes<
  ProjectsStackParams,
  ProjectsRouteName
> = {
  [ProjectsRouteName.authorizedProjects]: {
    component: AuthorizedProjectsScreen,
    name: ProjectsRouteName.authorizedProjects,
    options: {
      headerTitle: 'Je bouwprojecten',
    },
  },
  [ProjectsRouteName.createNotification]: {
    component: CreateNotificationScreen,
    name: ProjectsRouteName.createNotification,
    options: {
      presentation: 'modal',
      headerTitle: 'Verstuur pushbericht',
    },
  },
  [ProjectsRouteName.projects]: {
    component: ProjectsScreen,
    name: ProjectsRouteName.projects,
    options: {
      headerTitle: 'Werk in uitvoering',
    },
  },
  [ProjectsRouteName.project]: {
    component: ProjectScreen,
    name: ProjectsRouteName.project,
  },
  [ProjectsRouteName.projectBody]: {
    component: ProjectBodyScreen,
    name: ProjectsRouteName.projectBody,
  },
  [ProjectsRouteName.projectManager]: {
    component: ProjectManagerScreen,
    name: ProjectsRouteName.projectManager,
    options: {
      headerTitle: 'Welkom',
      presentation: 'modal',
    },
  },
  [ProjectsRouteName.projectNews]: {
    component: ProjectNewsScreen,
    name: ProjectsRouteName.projectNews,
  },
  [ProjectsRouteName.projectWarning]: {
    component: ProjectWarningScreen,
    name: ProjectsRouteName.projectWarning,
  },
}
