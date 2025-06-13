import {ParkingActionButton} from '@/modules/parking/components/ParkingActionButton'
import {ParkingRouteName} from '@/modules/parking/routes'
import {parkingSlice, ParkingState} from '@/modules/parking/slice'
import {logout} from '@/modules/parking/utils/logout'
import {ModuleSlug} from '@/modules/slugs'
import {type ModuleClientConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof ParkingState)[] = [
  'currentAccountType',
  'currentPermitName',
  'accessTokenExpiration',
] as const

export const parkingModule: ModuleClientConfig = {
  ActionButton: ParkingActionButton,
  logout: (dispatch, state) => logout(true, dispatch, state),
  name: 'ParkingModule',
  linking: {
    [ParkingRouteName.dashboard]: 'parking/:action/return',
    [ParkingRouteName.login]: 'parking/visitor/:reportCode/:pin',
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
