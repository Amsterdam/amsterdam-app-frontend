import {StackNavigationRoutes} from '@/app/navigation'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {
  ProjectBodyScreen,
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
  [ConstructionWorkRouteName.projectNews]: {
    component: ProjectNewsScreen,
    name: ConstructionWorkRouteName.projectNews,
  },
  [ConstructionWorkRouteName.projectWarning]: {
    component: ProjectWarningScreen,
    name: ConstructionWorkRouteName.projectWarning,
  },
}
