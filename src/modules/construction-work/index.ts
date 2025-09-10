import type {ModuleClientConfig} from '@/modules/types'
import {PreRenderComponent} from '@/modules/construction-work/components/PreRenderComponent'
import {
  onNotificationEvent,
  type PushNotificationType,
} from '@/modules/construction-work/onNotificationEvent'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {
  type ConstructionWorkState,
  constructionWorkSlice,
} from '@/modules/construction-work/slice'
import {ModuleSlug} from '@/modules/slugs'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof ConstructionWorkState)[] = ['readArticles']

export const constructionWorkModule: ModuleClientConfig<{
  type: PushNotificationType
}> = {
  PreRenderComponent: PreRenderComponent,
  linking: {
    [ConstructionWorkRouteName.projectNews]:
      'news/:id/:screenHeaderTitle/:screenTitle/:isPushNotificationDeeplink?',
    [ConstructionWorkRouteName.projectWarning]:
      'warning/:id/:screenHeaderTitle/:screenTitle/:isPushNotificationDeeplink?',
    [ConstructionWorkRouteName.project]: 'construction-work/project/:id',
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
  onNotificationEvent,
}
