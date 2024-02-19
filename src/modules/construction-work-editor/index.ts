import {PreRenderComponent} from '@/modules/construction-work-editor/components/PreRenderComponent'
import {messageDraftSlice} from '@/modules/construction-work-editor/messageDraftSlice'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {constructionWorkEditorSlice} from '@/modules/construction-work-editor/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const constructionWorkEditorModule: ModuleClientConfig = {
  PreRenderComponent,
  requiresAuthorization: true,
  linking: {
    [ConstructionWorkEditorRouteName.authorizedProjects]: 'project-manager/:id',
  },
  logDimension: PiwikSessionDimension.constructionWorkEditorModule,
  name: 'ConstructionWorkEditorModule',
  reduxConfigs: [
    {
      key: ReduxKey.constructionWorkEditor,
      persistVersion: 0,
      slice: constructionWorkEditorSlice,
    },
    {
      key: ReduxKey.messageDraft,
      persistVersion: 0,
      slice: messageDraftSlice,
    },
  ],
  slug: ModuleSlug['construction-work-editor'],
}
