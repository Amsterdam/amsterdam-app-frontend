import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingSession, VisitorParkingSession} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'

type Props = {
  parkingSession: ParkingSession | VisitorParkingSession
}

export const ParkingPlannedSessionNavigationButton = ({
  parkingSession,
}: Props) => {
  const {navigate} = useNavigation()
  const {start_date_time, end_date_time, vehicle_id, visitor_name} =
    parkingSession
  const title = `${vehicle_id}${visitor_name ? ' - ' + visitor_name : ''}`

  const remainingTimeString = formatTimeRangeToDisplay(
    start_date_time,
    end_date_time,
    {short: true},
  )
  const remainingTimeStringLong = formatTimeRangeToDisplay(
    start_date_time,
    end_date_time,
    {short: false},
  )
  const currentPermit = useCurrentParkingPermit()
  const startTimeString = `${dayjs(start_date_time).format('HH.mm')} uur`
  const description = currentPermit.no_endtime
    ? `${startTimeString}`
    : `${startTimeString} - ${remainingTimeString}`

  return (
    <NavigationButton
      accessibilityLabel={`Kenteken ${title}. Starttijd ${startTimeString} ${!currentPermit.no_endtime ? 'Parkeertijd ' + remainingTimeStringLong : ''}`}
      description={description}
      icon="parkingCar"
      iconSize="lg"
      inset={false}
      onPress={() => {
        navigate(ParkingRouteName.parkingSession, {parkingSession})
      }}
      testID="ParkingPlannedSessionNavigationButton"
      title={title}
    />
  )
}
