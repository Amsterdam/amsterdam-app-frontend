import {BadgeValue} from '@/modules/construction-work/components/BadgeValue'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {constructionWorkSlice} from '@/modules/construction-work/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const module: ModuleClientConfig = {
  BadgeValue,
  linking: {
    [ConstructionWorkRouteName.projectNews]: 'news/:id',
    [ConstructionWorkRouteName.projectWarning]: 'warning/:id',
  },
  name: 'ConstructionWorkModule',
  reduxConfigs: [
    {
      key: ReduxKey.constructionWork,
      persistVersion: 0,
      persistWhitelist: ['readArticles'],
      slice: constructionWorkSlice,
    },
  ],
  requiresFirebaseToken: true,
  slug: ModuleSlug['construction-work'],
}
