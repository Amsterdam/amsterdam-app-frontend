import {cityPassSlice} from '@/modules/city-pass/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const cityPassModule: ModuleClientConfig = {
  logDimension: PiwikSessionDimension.cityPassModule,
  name: 'CityPassModule',
  reduxConfigs: [
    {
      key: ReduxKey.cityPass,
      persistVersion: 0,
      slice: cityPassSlice,
    },
  ],
  slug: ModuleSlug['city-pass'],
}
