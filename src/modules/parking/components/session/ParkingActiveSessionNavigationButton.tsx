import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingSession} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  parkingSession: ParkingSession
}

export const ParkingActiveSessionNavigationButton = ({
  parkingSession,
}: Props) => {
  const {navigate} = useNavigation()
  const {end_date, vehicle_id, visitor_name} = parkingSession
  const title = `${vehicle_id}${visitor_name ? ' - ' + visitor_name : ''}`
  const isEndDateToday = dayjs(end_date).isSame(dayjs(), 'day')

  return (
    <NavigationButton
      description={`Tot ${dayjs(end_date).format(isEndDateToday ? 'HH.mm' : 'D MMMM, HH.mm')} uur`}
      icon="parkingCar"
      iconSize="lg"
      inset={false}
      onPress={() => {
        navigate(ParkingRouteName.parkingSession, {parkingSession})
      }}
      testID="ParkingActiveSessionNavigationButton"
      title={title}
    />
  )
}
