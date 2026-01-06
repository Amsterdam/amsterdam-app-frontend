import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {fractionIconConfig} from '@/modules/waste-guide/constants'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {
  wasteGuideSlice,
  type WasteGuideState,
} from '@/modules/waste-guide/slice'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof WasteGuideState)[] = ['address', 'locationType']

export const wasteGuideModule = createClientModule({
  logDimension: PiwikSessionDimension.wasteGuideModule,
  name: 'WasteGuideModule',
  reduxConfigs: [
    {
      key: ReduxKey.wasteGuide,
      persistVersion: 0,
      slice: wasteGuideSlice,
      persistWhitelist,
    },
  ],
  requiresFirebaseToken: true,
  slug: ModuleSlug['waste-guide'],
  linking: {
    [WasteGuideRouteName.wasteGuide]: {
      path: '/afval/afvalinformatie/',
      parse: {adres: (address: string) => decodeURIComponent(address)},
    },
  },
  icons: fractionIconConfig,
})
