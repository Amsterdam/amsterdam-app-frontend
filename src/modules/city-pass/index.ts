import {CityPassActionButton} from '@/modules/city-pass/components/CityPassActionButton'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {cityPassSlice, CityPassState} from '@/modules/city-pass/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof CityPassState)[] = [
  'isCityPassOwnerRegistered',
  'accessTokenExpiration',
  'refreshTokenExpiration',
]

export const cityPassModule: ModuleClientConfig = {
  ActionButton: CityPassActionButton,
  linking: {
    [CityPassRouteName.loginSteps]:
      'stadspas/:loginResult/:accessToken?/:refreshToken?/:errorMessage?/:errorCode?',
  },
  logDimension: PiwikSessionDimension.cityPassModule,
  name: 'CityPassModule',
  reduxConfigs: [
    {
      key: ReduxKey.cityPass,
      slice: cityPassSlice,
      persistVersion: 0,
      persistWhitelist,
    },
  ],
  slug: ModuleSlug['city-pass'],
}
