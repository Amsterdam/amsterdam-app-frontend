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

export enum ConstructionWorkRouteName {
  authorizedProjects = 'AuthorizedProjects',
  createNotification = 'CreateNotification',
  project = 'Project',
  projects = 'Projects',
  projectBody = 'ProjectBody',
  projectManager = 'ProjectManager',
  projectNews = 'ProjectNews',
  projectWarning = 'ProjectWarning',
}

export type ProjectsStackParams = {
  [ConstructionWorkRouteName.authorizedProjects]: {projectManagerId: string}
  [ConstructionWorkRouteName.createNotification]: {project: ProjectIdAndTitle}
  [ConstructionWorkRouteName.projects]: undefined
  [ConstructionWorkRouteName.project]: {id: string}
  [ConstructionWorkRouteName.projectBody]: {
    body: ProjectBody
    headerTitle: string
  }
  [ConstructionWorkRouteName.projectManager]: {id: string}
  [ConstructionWorkRouteName.projectNews]: {id: string}
  [ConstructionWorkRouteName.projectWarning]: {id: string}
}

export const constructionWorkRoutes: StackNavigationRoutes<
  ProjectsStackParams,
  ConstructionWorkRouteName
> = {
  [ConstructionWorkRouteName.authorizedProjects]: {
    component: AuthorizedProjectsScreen,
    name: ConstructionWorkRouteName.authorizedProjects,
    options: {
      headerTitle: 'Je bouwprojecten',
    },
  },
  [ConstructionWorkRouteName.createNotification]: {
    component: CreateNotificationScreen,
    name: ConstructionWorkRouteName.createNotification,
    options: {
      presentation: 'modal',
      headerTitle: 'Verstuur pushbericht',
    },
  },
  [ConstructionWorkRouteName.projects]: {
    component: ProjectsScreen,
    name: ConstructionWorkRouteName.projects,
    options: {
      headerTitle: 'Werk in uitvoering',
    },
  },
  [ConstructionWorkRouteName.project]: {
    component: ProjectScreen,
    name: ConstructionWorkRouteName.project,
  },
  [ConstructionWorkRouteName.projectBody]: {
    component: ProjectBodyScreen,
    name: ConstructionWorkRouteName.projectBody,
  },
  [ConstructionWorkRouteName.projectManager]: {
    component: ProjectManagerScreen,
    name: ConstructionWorkRouteName.projectManager,
    options: {
      headerTitle: 'Welkom',
      presentation: 'modal',
    },
  },
  [ConstructionWorkRouteName.projectNews]: {
    component: ProjectNewsScreen,
    name: ConstructionWorkRouteName.projectNews,
  },
  [ConstructionWorkRouteName.projectWarning]: {
    component: ProjectWarningScreen,
    name: ConstructionWorkRouteName.projectWarning,
  },
}
