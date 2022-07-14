import {StackNavigationRoutes} from '../../app/navigation'
import {
  ConstructionWorkEditorRouteName,
  ConstructionWorkEditorStackParams,
} from './routes'
import {AuthorizedProjectsScreen} from './screens'

export const constructionWorkEditorScreenConfig: StackNavigationRoutes<
  ConstructionWorkEditorStackParams,
  ConstructionWorkEditorRouteName
> = {
  [ConstructionWorkEditorRouteName.authorizedProjects]: {
    component: AuthorizedProjectsScreen,
    name: ConstructionWorkEditorRouteName.authorizedProjects,
    options: {
      headerTitle: 'Plaats berichten',
    },
  },
}
