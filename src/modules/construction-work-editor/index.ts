import {PreRenderComponent} from '@/modules/construction-work-editor/components'
import {messageDraftSlice} from '@/modules/construction-work-editor/messageDraftSlice'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {constructionWorkEditorSlice} from '@/modules/construction-work-editor/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  PreRenderComponent,
  requiresAuthorization: true,
  linking: {
    [ConstructionWorkEditorRouteName.authorizedProjects]: 'project-manager/:id',
  },
  name: 'ConstructionWorkEditorModule',
  reduxConfig: [
    {
      key: 'constructionWorkEditor',
      persist: true,
      slice: constructionWorkEditorSlice,
    },
    {
      key: 'messageDraft',
      persist: true,
      slice: messageDraftSlice,
    },
  ],
  slug: ModuleSlug['construction-work-editor'],
}
