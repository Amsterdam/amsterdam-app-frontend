import {ParkingActionButton} from '@/modules/parking/components/ParkingActionButton'
import {ParkingPreRenderComponent} from '@/modules/parking/components/ParkingPreRenderComponent'
import {onNotificationEvent} from '@/modules/parking/onNotificationEvent'
import {ParkingRouteName} from '@/modules/parking/routes'
import {parkingSlice, ParkingState} from '@/modules/parking/slice'
import {logout} from '@/modules/parking/utils/logout'
import {postProcessLinking} from '@/modules/parking/utils/postProcessLinking'
import {ModuleSlug} from '@/modules/slugs'
import {type ModuleClientConfig} from '@/modules/types'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof ParkingState)[] = [
  'currentAccount',
  'currentPermitReportCode',
  'accounts',
  'visitorVehicleId',
] as const

export const parkingModule: ModuleClientConfig<{
  reportCode?: string
}> = {
  ActionButton: ParkingActionButton,
  logout: (dispatch, state) => logout(true, dispatch, state),
  name: 'ParkingModule',
  linking: {
    [ParkingRouteName.dashboard]: 'parking/:action/return',
    [ParkingRouteName.login]: 'parking/visitor/:reportCode/:pin',
  },
  onNotificationEvent,
  postProcessLinking,
  logDimension: PiwikSessionDimension.parkingModule,
  PreRenderComponent: ParkingPreRenderComponent,
  reduxConfigs: [
    {
      key: ReduxKey.parking,
      persistVersion: 0,
      persistWhitelist,
      slice: parkingSlice,
    },
  ],
  requiresFirebaseToken: true,
  slug: ModuleSlug.parking,
}
