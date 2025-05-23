import {ParkingRouteName} from '@/modules/parking/routes'
import {parkingSlice, ParkingState} from '@/modules/parking/slice'
import {ModuleSlug} from '@/modules/slugs'
import {type ModuleClientConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof ParkingState)[] = [
  'currentAccountType',
  'currentPermitName',
]

export const parkingModule: ModuleClientConfig = {
  name: 'ParkingModule',
  linking: {
    [ParkingRouteName.dashboard]: 'parking/:action/return',
  },
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
