import {impactAsync, ImpactFeedbackStyle} from 'expo-haptics'
import {useFormContext, useController} from 'react-hook-form'
import {Platform, StyleSheet} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {Tabs} from '@/components/ui/Tabs'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {TimeDurationSpinner} from '@/components/ui/forms/TimeDurationSpinner'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {ParkingPermit} from '@/modules/parking/types'
import {type Dayjs, dayjs} from '@/utils/datetime/dayjs'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'

type Props = {
  currentPermit: ParkingPermit
}

type FieldValues = {endTime?: Dayjs; startTime: Dayjs}

export const ParkingSessionDurationTimePicker = ({currentPermit}: Props) => {
  const {watch} = useFormContext<FieldValues>()
  const startTime = watch('startTime')
  const {
    field: {value: endTime, onChange},
  } = useController<FieldValues, 'endTime'>({
    name: 'endTime',
  })

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
            testID="ParkingSessionEndTimeIcon"
          />{' '}
          Eindtijd{' '}
          {formatTimeToDisplay(endTime ?? startTime, {includeHoursLabel: true})}
        </Phrase>
      </Column>
      <Gutter height="lg" />
      <Tabs testID="ParkingSessionDurationTimePickerTabs">
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

                onChange(newEndTime)

                if (Platform.OS === 'ios') {
                  void impactAsync(ImpactFeedbackStyle.Light)
                }
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
              onChange(dayjs(newStartTime))
            }}
            style={styles.centerSelf}
            theme="light"
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
