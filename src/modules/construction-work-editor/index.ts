import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  isForEmployees: true,
  linking: {
    [ConstructionWorkEditorRouteName.authorizedProjects]: 'project-manager/:id',
  },
  name: 'ConstructionWorkEditorModule',
  slug: ModuleSlug['construction-work-editor'],
  state: [],
}
