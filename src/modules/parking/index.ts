import {parkingSlice} from '@/modules/parking/slice'
import {ModuleSlug} from '@/modules/slugs'
import {type ModuleClientConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const parkingModule: ModuleClientConfig = {
  name: 'ParkingModule',
  reduxConfigs: [
    {
      key: ReduxKey.parking,
      slice: parkingSlice,
    },
  ],
  slug: ModuleSlug.parking,
}
