import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {wasteGuideSlice} from '@/modules/waste-guide/slice'

export const module: ModuleClientConfig = {
  name: 'WasteGuideModule',
  reduxConfigs: [
    {
      key: 'wasteGuide',
      persistVersion: 0,
      slice: wasteGuideSlice,
    },
  ],
  slug: ModuleSlug['waste-guide'],
}
