import {impactAsync, ImpactFeedbackStyle} from 'expo-haptics'
import {useContext} from 'react'
import {StyleSheet} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {Tabs} from '@/components/ui/Tabs'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {TimeDurationSpinner} from '@/components/ui/forms/TimeDurationSpinner'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionContext} from '@/modules/parking/components/form/ParkingSessionProvider'
import {ParkingPermit} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'

type Props = {
  currentPermit: ParkingPermit
}

export const ParkingSessionDurationTimePicker = ({currentPermit}: Props) => {
  const {startTime, endTime, setEndTime} = useContext(ParkingSessionContext)

  return (
    <Column>
      <Column
        gutter="lg"
        halign="center">
        <SingleSelectable>
          <Title
            level="h1"
            text={formatTimeRangeToDisplay(startTime, endTime ?? startTime)}
            textAlign="center"
          />
          <Title
            level="h5"
            text="Parkeertijd"
            textAlign="center"
          />
        </SingleSelectable>
        <Phrase>
          <Icon
            name="clock"
            size="sm"
          />{' '}
          Eindtijd{' '}
          {formatTimeToDisplay(endTime ?? startTime, {includeHoursLabel: true})}
        </Phrase>
      </Column>
      <Gutter height="lg" />
      <Tabs>
        <Tabs.Tab label="Parkeertijd">
          <Column halign="center">
            <Gutter height="lg" />
            <TimeDurationSpinner
              initialHours={endTime?.diff(startTime, 'hour') ?? 0}
              initialMinutes={
                endTime
                  ? endTime.diff(startTime, 'minute') -
                    endTime.diff(startTime, 'hour') * 60
                  : 0
              }
              maxHours={
                currentPermit.max_session_length_in_days === 1
                  ? startTime.endOf('day').diff(startTime, 'hour')
                  : undefined
              }
              maxMinutes={
                currentPermit.max_session_length_in_days === 1
                  ? startTime.endOf('day').diff(startTime, 'minutes') -
                    startTime.endOf('day').diff(startTime, 'hour') * 60
                  : undefined
              }
              onChange={(hours, minutes) => {
                const newEndTime = startTime
                  .add(hours, 'hour')
                  .add(minutes, 'minute')

                setEndTime(newEndTime)
                void impactAsync(ImpactFeedbackStyle.Light)
              }}
            />
            <Gutter height="lg" />
          </Column>
        </Tabs.Tab>
        <Tabs.Tab label="Eindtijd">
          <DatePicker
            date={endTime?.toDate() ?? startTime.toDate()}
            is24hourSource="locale"
            locale="nl-NL"
            maximumDate={
              currentPermit.max_session_length_in_days === 1
                ? startTime.endOf('day').toDate()
                : undefined
            }
            minimumDate={startTime.toDate()}
            mode="time"
            onDateChange={newStartTime => {
              setEndTime(dayjs(newStartTime))
            }}
            style={styles.centerSelf}
          />
        </Tabs.Tab>
      </Tabs>
    </Column>
  )
}

const styles = StyleSheet.create({
  centerSelf: {
    alignSelf: 'center',
  },
})
