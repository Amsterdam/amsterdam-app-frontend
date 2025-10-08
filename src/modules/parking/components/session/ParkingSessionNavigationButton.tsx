import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {
  ParkingHistorySession,
  ParkingSession,
  VisitorParkingSession,
} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'

type Props = {
  parkingSession: ParkingSession | VisitorParkingSession | ParkingHistorySession
}

export const ParkingSessionNavigationButton = ({parkingSession}: Props) => {
  const {navigate} = useNavigation()
  const {start_date_time, end_date_time, vehicle_id, visitor_name} =
    parkingSession
  const title = `${vehicle_id}${visitor_name ? ' - ' + visitor_name : ''}`

  const remainingTimeStringLong = formatTimeRangeToDisplay(
    start_date_time,
    end_date_time,
    {short: false},
  )
  const currentPermit = useCurrentParkingPermit()
  const startDateTimeString = `${dayjs(start_date_time).format('D MMMM, HH.mm')} uur`
  const startTimeString = `${dayjs(start_date_time).format('HH.mm')} uur`
  const endTimeString = `${dayjs(end_date_time).format('HH.mm')} uur`
  const description =
    currentPermit.no_endtime || currentPermit.max_session_length_in_days > 1
      ? `${startDateTimeString}`
      : `Van ${startTimeString} tot ${endTimeString}`

  return (
    <NavigationButton
      accessibilityLabel={`Kenteken ${title}. Starttijd ${startTimeString} ${!currentPermit.no_endtime ? 'Parkeertijd ' + remainingTimeStringLong : ''}`}
      description={description}
      iconName="parkingCar"
      iconSize="lg"
      insetHorizontal="no"
      insetVertical="no"
      onPress={() => {
        navigate(ParkingRouteName.parkingSession, {parkingSession})
      }}
      testID="ParkingSessionNavigationButton"
      title={title}
    />
  )
}
