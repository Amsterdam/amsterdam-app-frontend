import {BadgeValue} from '@/modules/construction-work/components/BadgeValue'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {constructionWorkSlice} from '@/modules/construction-work/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  BadgeValue,
  linking: {
    [ConstructionWorkRouteName.projectNews]: 'news/:id',
    [ConstructionWorkRouteName.projectWarning]: 'warning/:id',
  },
  name: 'ConstructionWorkModule',
  reduxConfigs: [
    {
      key: 'constructionWork',
      persist: true,
      slice: constructionWorkSlice,
      persistWhitelist: ['readArticles'],
    },
  ],
  requiresFirebaseToken: true,
  slug: ModuleSlug['construction-work'],
}
