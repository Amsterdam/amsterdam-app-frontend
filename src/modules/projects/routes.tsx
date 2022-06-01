import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'
import {ProjectDetailBody} from '../../types'
import {
  AuthorizedProjectsScreen,
  ProjectDetailBodyScreen,
  ProjectDetailScreen,
  ProjectManagerScreen,
  ProjectNewsScreen,
  ProjectsScreen,
  ProjectWarningScreen,
} from './screens'
import {
  CreateNotificationScreen,
  ProjectMinimal,
} from './screens/create-notification'

export enum ProjectsRouteName {
  authorizedProjects = 'AuthorizedProjects',
  createNotification = 'CreateNotification',
  projectDetail = 'ProjectDetail',
  projectDetailBody = 'ProjectDetailBody',
  projectManager = 'ProjectManager',
  projectNews = 'ProjectNews',
  projects = 'Projects',
  projectWarning = 'ProjectWarning',
}

export type ProjectsStackParams = {
  [ProjectsRouteName.authorizedProjects]: {projectManagerId: string}
  [ProjectsRouteName.createNotification]: {projectDetails: ProjectMinimal}
  [ProjectsRouteName.projectDetail]: {id: string}
  [ProjectsRouteName.projectDetailBody]: {
    body: ProjectDetailBody
  }
  [ProjectsRouteName.projectManager]: {id: string}
  [ProjectsRouteName.projectNews]: {id: string}
  [ProjectsRouteName.projects]: undefined
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
      headerTitle: () => <NonScalingHeaderTitle text="Je bouwprojecten" />,
    },
  },
  [ProjectsRouteName.createNotification]: {
    component: CreateNotificationScreen,
    name: ProjectsRouteName.createNotification,
    options: {
      presentation: 'modal',
      headerTitle: () => <NonScalingHeaderTitle text="Verstuur pushbericht" />,
    },
  },
  [ProjectsRouteName.projectDetail]: {
    component: ProjectDetailScreen,
    name: ProjectsRouteName.projectDetail,
  },
  [ProjectsRouteName.projectDetailBody]: {
    component: ProjectDetailBodyScreen,
    name: ProjectsRouteName.projectDetailBody,
  },
  [ProjectsRouteName.projectManager]: {
    component: ProjectManagerScreen,
    name: ProjectsRouteName.projectManager,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Welkom" />,
      presentation: 'modal',
    },
  },
  [ProjectsRouteName.projectNews]: {
    component: ProjectNewsScreen,
    name: ProjectsRouteName.projectNews,
  },
  [ProjectsRouteName.projects]: {
    component: ProjectsScreen,
    name: ProjectsRouteName.projects,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Bouwprojecten" />,
    },
  },
  [ProjectsRouteName.projectWarning]: {
    component: ProjectWarningScreen,
    name: ProjectsRouteName.projectWarning,
  },
}
