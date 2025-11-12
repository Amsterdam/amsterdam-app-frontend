import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {ParkingSessionDetails} from '@/modules/parking/components/session/details/ParkingSessionDetails'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = NavigationProps<ParkingRouteName.parkingSession>

export const ParkingSessionScreen = ({route}: Props) => {
  const {parkingSession} = route.params ?? {}

  return (
    <CurrentPermitProvider>
      <Screen testID="ParkingSessionScreen">
        <ParkingSessionDetails parkingSession={parkingSession} />
      </Screen>
    </CurrentPermitProvider>
  )
}
