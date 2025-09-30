import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingSession, VisitorParkingSession} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  noEndTime?: boolean
  parkingSession: ParkingSession | VisitorParkingSession
}

export const ParkingActiveSessionNavigationButton = ({
  parkingSession,
  noEndTime,
}: Props) => {
  const {navigate} = useNavigation()
  const {end_date_time, start_date_time, vehicle_id, visitor_name} =
    parkingSession
  const title = `${vehicle_id}${visitor_name ? ' - ' + visitor_name : ''}`
  const isEndDateToday = dayjs(end_date_time).isSame(dayjs(), 'day')

  return (
    <NavigationButton
      accessibilityLabel={`Kenteken ${title}`}
      description={
        noEndTime
          ? `Actief sinds ${dayjs(start_date_time).format(isEndDateToday ? 'HH.mm' : 'D MMMM, HH.mm')} uur`
          : `Tot ${dayjs(end_date_time).format(isEndDateToday ? 'HH.mm' : 'D MMMM, HH.mm')} uur`
      }
      iconName="parkingCar"
      iconSize="lg"
      insetHorizontal="no"
      insetVertical="no"
      onPress={() => {
        navigate(ParkingRouteName.parkingSession, {parkingSession})
      }}
      testID="ParkingActiveSessionNavigationButton"
      title={title}
    />
  )
}
