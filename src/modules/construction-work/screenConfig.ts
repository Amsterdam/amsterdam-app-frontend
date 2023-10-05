import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  ConstructionWorkModalParams,
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {ConstructionWorkScreen} from '@/modules/construction-work/screens/ConstructionWork.screen'
import {ConstructionWorkSearchScreen} from '@/modules/construction-work/screens/ConstructionWorkSearch.screen'
import {ProjectScreen} from '@/modules/construction-work/screens/Project.screen'
import {ProjectBodyScreen} from '@/modules/construction-work/screens/ProjectBody.screen'
import {ProjectNewsScreen} from '@/modules/construction-work/screens/ProjectNews.screen'
import {ProjectWarningScreen} from '@/modules/construction-work/screens/ProjectWarning.screen'

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
      preventInitialFocus: true,
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
