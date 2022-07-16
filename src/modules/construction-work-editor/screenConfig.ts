import {StackNavigationRoutes} from '@/app/navigation'
import {
  ConstructionWorkEditorRouteName,
  ConstructionWorkEditorStackParams,
} from '@/modules/construction-work-editor/routes'
import {AuthorizedProjectsScreen} from '@/modules/construction-work-editor/screens'

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
