import {CityPasses} from '@/modules/city-pass/components/CityPasses'
import {HeaderComponent} from '@/modules/city-pass/components/HeaderComponent'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {cityPassSlice} from '@/modules/city-pass/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const cityPassModule: ModuleClientConfig = {
  linking: {[CityPassRouteName.dashboard]: 'stadspas/:loginResult'},
  logDimension: PiwikSessionDimension.cityPassModule,
  name: 'CityPassModule',
  HeaderComponent,
  PreRenderComponent: CityPasses,
  reduxConfigs: [
    {
      key: ReduxKey.cityPass,
      persistVersion: 0,
      slice: cityPassSlice,
    },
  ],
  slug: ModuleSlug['city-pass'],
}
