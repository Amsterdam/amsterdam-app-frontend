import {parkingSlice, ParkingState} from '@/modules/parking/slice'
import {ModuleSlug} from '@/modules/slugs'
import {type ModuleClientConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof ParkingState)[] = ['currentAccountType']

export const parkingModule: ModuleClientConfig = {
  name: 'ParkingModule',
  reduxConfigs: [
    {
      key: ReduxKey.parking,
      persistVersion: 0,
      persistWhitelist,
      slice: parkingSlice,
    },
  ],
  slug: ModuleSlug.parking,
}
