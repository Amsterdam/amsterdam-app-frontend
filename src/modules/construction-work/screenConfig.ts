import {ConstructionWorkRouteName, ConstructionWorkStackParams} from './routes'
import {StackNavigationRoutes} from '@/app/navigation'
import {
  ProjectBodyScreen,
  ProjectManagerScreen,
  ProjectNewsScreen,
  ProjectScreen,
  ProjectsScreen,
  ProjectWarningScreen,
} from '@/modules/construction-work/screens'
import {CreateNotificationScreen} from '@/modules/construction-work/screens/create-notification'

export const constructionWorkScreenConfig: StackNavigationRoutes<
  ConstructionWorkStackParams,
  ConstructionWorkRouteName
> = {
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
      headerTitle: 'Werkzaamheden',
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
