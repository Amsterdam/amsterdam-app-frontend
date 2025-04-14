import {NavigationProps} from '@/app/navigation/types'
import {ParkingSessionDetails} from '@/modules/parking/components/session/ParkingSessionDetails'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = NavigationProps<ParkingRouteName.parkingSession>

export const ParkingSessionScreen = ({route}: Props) => {
  const {parkingSession} = route.params ?? {}

  return <ParkingSessionDetails parkingSession={parkingSession} />
}
