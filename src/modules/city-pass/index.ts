import {HeaderComponent} from '@/modules/city-pass/components/HeaderComponent'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {cityPassSlice} from '@/modules/city-pass/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const cityPassModule: ModuleClientConfig = {
  linking: {
    [CityPassRouteName.loginSteps]:
      'stadspas/:loginResult/:accessToken?/:refreshToken?',
  },
  logDimension: PiwikSessionDimension.cityPassModule,
  name: 'CityPassModule',
  HeaderComponent,
  reduxConfigs: [
    {
      key: ReduxKey.cityPass,
      slice: cityPassSlice,
      persistVersion: 0,
      persistWhitelist: ['isCityPassOwnerRegistered'],
    },
  ],
  slug: ModuleSlug['city-pass'],
}
