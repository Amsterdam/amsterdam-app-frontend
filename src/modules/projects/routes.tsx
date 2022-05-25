import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'
import {ProjectDetailBody} from '../../types'
import {
  ProjectDetailBodyScreen,
  ProjectDetailScreen,
  ProjectManagerScreen,
  ProjectNewsScreen,
  ProjectsScreen,
  ProjectWarningScreen,
} from './screens'

export enum ProjectsRouteName {
  projectDetail = 'ProjectDetail',
  projectDetailBody = 'ProjectDetailBody',
  projectManager = 'ProjectManager',
  projectNews = 'ProjectNews',
  projects = 'Projects',
  projectWarning = 'ProjectWarning',
}

type ProjectsStackParams = {
  [ProjectsRouteName.projectDetail]: {id: string}
  [ProjectsRouteName.projectDetailBody]: {body: ProjectDetailBody}
  [ProjectsRouteName.projectManager]: {id: string}
  [ProjectsRouteName.projectNews]: {id: string}
  [ProjectsRouteName.projects]: undefined
  [ProjectsRouteName.projectWarning]: {id: string}
}

export const projectRoutes: StackNavigationRoutes<
  ProjectsStackParams,
  ProjectsRouteName
> = {
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
