import {BadgeValue} from '@/modules/construction-work/components/BadgeValue'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {
  ConstructionWorkState,
  constructionWorkSlice,
} from '@/modules/construction-work/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof ConstructionWorkState)[] = ['readArticles']

export const constructionWorkModule: ModuleClientConfig = {
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
      persistWhitelist,
      slice: constructionWorkSlice,
    },
  ],
  requiresFirebaseToken: true,
  slug: ModuleSlug['construction-work'],
}
