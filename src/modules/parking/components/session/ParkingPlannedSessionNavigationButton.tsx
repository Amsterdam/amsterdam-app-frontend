import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingSession} from '@/modules/parking/types'
import {convertMillisecondsToHoursAndMinutes} from '@/modules/parking/utils/convertMillisecondsToHoursAndMinutes'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  parkingSession: ParkingSession
}

export const ParkingPlannedSessionNavigationButton = ({
  parkingSession,
}: Props) => {
  const {navigate} = useNavigation()
  const {start_date, end_date, vehicle_id, visitor_name} = parkingSession
  const title = `${vehicle_id}${visitor_name ? ' - ' + visitor_name : ''}`
  const isStartDateToday = dayjs(start_date).isSame(dayjs(), 'day')
  const timeDifferenceMs = dayjs(end_date).diff(
    dayjs(start_date),
    'milliseconds',
  )
  const remainingTimeInHoursAndMinutes =
    convertMillisecondsToHoursAndMinutes(timeDifferenceMs)
  const remainingTimeSentence = `${remainingTimeInHoursAndMinutes[0]} uur ${remainingTimeInHoursAndMinutes[1] ? remainingTimeInHoursAndMinutes[1] + ' min' : ''}`

  return (
    <Column gutter="sm">
      <Phrase
        emphasis="strong"
        testID="ParkingPlannedSessionDatePhrase">
        {isStartDateToday
          ? 'Vandaag'
          : dayjs(start_date).format('DD MMMM YYYY')}
      </Phrase>
      <NavigationButton
        description={`${dayjs(start_date).format('HH.mm')} - ${remainingTimeSentence}`}
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
