import {PreRenderComponent} from '@/modules/construction-work/PreRenderComponent'
import {onNotificationEvent} from '@/modules/construction-work/onNotificationEvent'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {
  type ConstructionWorkState,
  constructionWorkSlice,
} from '@/modules/construction-work/slice'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof ConstructionWorkState)[] = [
  'readArticles',
  'address',
  'locationType',
]

export const constructionWorkModule = createClientModule({
  PreRenderComponent,
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
})
