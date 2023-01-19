import {StackNavigationRoutes} from '@/app/navigation'
import {
  ConstructionWorkModalParams,
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {
  ConstructionWorkScreen,
  ConstructionWorkSearchScreen,
  ProjectBodyScreen,
  ProjectNewsScreen,
  ProjectScreen,
  ProjectWarningScreen,
} from '@/modules/construction-work/screens'

export const screenConfig: StackNavigationRoutes<
  ConstructionWorkStackParams,
  ConstructionWorkRouteName
> = {
  [ConstructionWorkRouteName.constructionWork]: {
    component: ConstructionWorkScreen,
    name: ConstructionWorkRouteName.constructionWork,
    options: {
      headerTitle: 'Werkzaamheden',
    },
  },
  [ConstructionWorkRouteName.search]: {
    component: ConstructionWorkSearchScreen,
    name: ConstructionWorkRouteName.search,
    options: {
      headerTitle: 'Zoek in werkzaamheden',
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

export const constructionWorkModals: StackNavigationRoutes<ConstructionWorkModalParams> =
  {}
