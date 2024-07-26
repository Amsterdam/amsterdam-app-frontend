import {BadgeValue} from '@/modules/construction-work/components/BadgeValue'
import {PreRenderComponent} from '@/modules/construction-work/components/PreRenderComponent'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {
  ConstructionWorkState,
  constructionWorkSlice,
} from '@/modules/construction-work/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof ConstructionWorkState)[] = ['readArticles']

export const constructionWorkModule: ModuleClientConfig = {
  PreRenderComponent: {Component: PreRenderComponent},
  BadgeValue,
  linking: {
    [ConstructionWorkRouteName.projectNews]:
      'news/:id/:screenHeaderTitle/:screenTitle',
    [ConstructionWorkRouteName.projectWarning]:
      'warning/:id/:screenHeaderTitle/:screenTitle',
  },
  logDimension: PiwikSessionDimension.constructionWorkModule,
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
