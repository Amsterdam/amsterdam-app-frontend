import {NavigationProps} from '@/app/navigation/types'
import {ParkingSessionDetails} from '@/modules/parking/components/session/ParkingSessionDetails'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = NavigationProps<ParkingRouteName.parkingSession>

export const ParkingSessionScreen = ({route}: Props) => {
  const {parkingSession} = route.params ?? {}

  return (
    <CurrentPermitProvider>
      <ParkingSessionDetails parkingSession={parkingSession} />
    </CurrentPermitProvider>
  )
}
