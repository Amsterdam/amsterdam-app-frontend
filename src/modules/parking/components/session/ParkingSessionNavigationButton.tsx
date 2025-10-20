import {useMemo} from 'react'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'
import {ParkingRouteName} from '@/modules/parking/routes'
import {
  type ParkingSession,
  type VisitorParkingSession,
  type ParkingHistorySession,
  ParkingSessionStatus,
} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'

const DATE_FORMAT = 'D MMMM, HH.mm'

type Props = {
  parkingSession: ParkingSession | VisitorParkingSession | ParkingHistorySession
}

export const ParkingSessionNavigationButton = ({parkingSession}: Props) => {
  const {navigate} = useNavigation()
  const currentPermit = useCurrentParkingPermit()
  const {licensePlates} = useGetLicensePlates()
  const possiblyVisitorName = useMemo(
    () =>
      licensePlates?.find(lp => lp.vehicle_id === parkingSession.vehicle_id)
        ?.visitor_name,
    [licensePlates, parkingSession.vehicle_id],
  )
  const {vehicle_id, visitor_name} = parkingSession
  const visitorName = visitor_name ?? possiblyVisitorName
  const title = `${vehicle_id}${visitorName ? ' - ' + visitorName : ''}`

  return (
    <NavigationButton
      accessibilityLabel={getAccessibilityLabel(
        parkingSession,
        title,
        currentPermit.no_endtime,
      )}
      description={getDescription(
        parkingSession,
        currentPermit.max_session_length_in_days,
        currentPermit.no_endtime,
      )}
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

const getAccessibilityLabel = (
  parkingSession: Props['parkingSession'],
  title: string,
  noEndTime: boolean,
) => {
  const {start_date_time, end_date_time, status} = parkingSession

  if (status === ParkingSessionStatus.active) {
    return `Kenteken ${title}`
  }

  const remainingTimeStringLong = formatTimeRangeToDisplay(
    start_date_time,
    end_date_time,
    {short: false},
  )
  const startTimeString = `${dayjs(start_date_time).format('HH.mm')} uur`

  return `Kenteken ${title}. Starttijd ${startTimeString} ${!noEndTime ? 'Parkeertijd ' + remainingTimeStringLong : ''}`
}

const getDescription = (
  parkingSession: Props['parkingSession'],
  maxSessionLengthInDays: number,
  noEndTime: boolean,
) => {
  const {start_date_time, end_date_time, status} = parkingSession

  if (status === ParkingSessionStatus.active) {
    const isEndDateToday = dayjs(end_date_time).isSame(dayjs(), 'day')

    return noEndTime
      ? `Actief sinds ${dayjs(start_date_time).format(isEndDateToday ? 'HH.mm' : DATE_FORMAT)} uur`
      : `Tot ${dayjs(end_date_time).format(isEndDateToday ? 'HH.mm' : DATE_FORMAT)} uur`
  }

  const startDateTimeString = `${dayjs(start_date_time).format(DATE_FORMAT)} uur`
  const startTimeString = `${dayjs(start_date_time).format('HH.mm')} uur`
  const endTimeString = `${dayjs(end_date_time).format('HH.mm')} uur`

  return noEndTime || maxSessionLengthInDays > 1
    ? `${startDateTimeString}`
    : `Van ${startTimeString} tot ${endTimeString}`
}
