import {NavigationProps} from '@/app/navigation/types'
import {Title} from '@/components/ui/text/Title'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = NavigationProps<ParkingRouteName.parkingSession>

export const ParkingSessionScreen = ({route}: Props) => {
  const {parkingSession} = route.params ?? {}

  return <Title text={parkingSession.vehicle_id} />
}
