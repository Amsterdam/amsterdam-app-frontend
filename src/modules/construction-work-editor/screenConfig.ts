import {StackNavigationRoutes} from '../../app/navigation'
import {
  ConstructionWorkEditorStackParams,
  ConstructionWorkEditorRouteName,
} from './routes'
import {MyProjectsScreen} from './screens'

export const constructionWorkEditorScreenConfig: StackNavigationRoutes<
  ConstructionWorkEditorStackParams,
  ConstructionWorkEditorRouteName
> = {
  [ConstructionWorkEditorRouteName.myProjects]: {
    component: MyProjectsScreen,
    name: ConstructionWorkEditorRouteName.myProjects,
    options: {
      headerTitle: 'Template',
    },
  },
}
