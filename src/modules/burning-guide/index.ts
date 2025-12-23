import {
  burningGuideSlice,
  type BurningGuideState,
} from '@/modules/burning-guide/slice'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof BurningGuideState)[] = [
  'address',
  'locationType',
]

export const burningGuideModule = createClientModule({
  name: 'BurningGuideModule',
  slug: ModuleSlug['burning-guide'],
  reduxConfigs: [
    {
      key: ReduxKey.burningGuide,
      persistVersion: 0,
      slice: burningGuideSlice,
      persistWhitelist,
    },
  ],
  requiresFirebaseToken: true,
})
