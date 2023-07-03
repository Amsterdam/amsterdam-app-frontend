import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {wasteGuideSlice} from '@/modules/waste-guide/slice'
import {ReduxKey} from '@/store/types/reduxKey'

export const module: ModuleClientConfig = {
  name: 'WasteGuideModule',
  reduxConfigs: [
    {
      key: ReduxKey.wasteGuide,
      persistVersion: 0,
      slice: wasteGuideSlice,
    },
  ],
  slug: ModuleSlug['waste-guide'],
}
