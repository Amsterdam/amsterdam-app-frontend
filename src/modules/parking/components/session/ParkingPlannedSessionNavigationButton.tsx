import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingSession} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'

type Props = {
  parkingSession: ParkingSession
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

  return (
    <Column gutter="sm">
      <Phrase
        emphasis="strong"
        testID="ParkingPlannedSessionDatePhrase">
        {formatDateToDisplay(start_date_time, false)}
      </Phrase>
      <NavigationButton
        description={`${dayjs(start_date_time).format('HH.mm')} uur - ${remainingTimeString}`}
        icon="parkingCar"
        iconSize="lg"
        inset={false}
        onPress={() => {
          navigate(ParkingRouteName.parkingSession, {parkingSession})
        }}
        testID="ParkingPlannedSessionNavigationButton"
        title={title}
      />
    </Column>
  )
}
