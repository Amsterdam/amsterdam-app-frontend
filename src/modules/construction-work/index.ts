import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {constructionWorkSlice} from '@/modules/construction-work/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  linking: {
    [ConstructionWorkRouteName.projectNews]: 'news/:id',
    [ConstructionWorkRouteName.projectWarning]: 'warning/:id',
  },
  name: 'ConstructionWorkModule',
  requiresFirebaseToken: true,
  slug: ModuleSlug['construction-work'],
  state: [constructionWorkSlice],
}
