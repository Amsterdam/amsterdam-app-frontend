import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {ParkingPlannedSessionsList} from '@/modules/parking/components/sessionsList/ParkingPlannedSessionsList'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = NavigationProps<ParkingRouteName.parkingPlannedSessions>

export const ParkingPlannedSessionsScreen = ({route}: Props) => {
  const {params} = route || {}

  return (
    <CurrentPermitProvider>
      <Screen
        scroll={false}
        testID="ParkingPlannedSessionsScreen">
        <ParkingPlannedSessionsList
          visitorVehicleId={params?.visitorVehicleId}
        />
      </Screen>
    </CurrentPermitProvider>
  )
}
