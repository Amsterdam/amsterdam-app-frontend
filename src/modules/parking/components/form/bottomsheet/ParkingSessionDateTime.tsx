import {useMemo} from 'react'
import {StyleSheet} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {Tabs} from '@/components/ui/Tabs' // Updated import
import {Column} from '@/components/ui/layout/Column'
import {Dayjs, dayjs} from '@/utils/datetime/dayjs'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'
import {roundDownToMinutes} from '@/utils/datetime/roundDownToMinutes'

type Props = {
  dateTime: Dayjs
  maxDateTime?: Dayjs
  setDateTime: (time: Dayjs) => void
}

export const ParkingSessionDateTime = ({
  dateTime,
  setDateTime,
  maxDateTime,
}: Props) => {
  const justNow = useMemo(roundDownToMinutes, [])

  return (
    <Column grow={1}>
      <Tabs testID="ParkingSessionDateTimeTabs">
        <Tabs.Tab
          label={formatTimeToDisplay(dateTime, {
            hoursLabelShort: true,
            includeHoursLabel: true,
          })}>
          <DatePicker
            date={dateTime.toDate()}
            is24hourSource="locale"
            locale="nl-NL"
            maximumDate={maxDateTime?.toDate()}
            minimumDate={justNow.toDate()}
            mode="time"
            onDateChange={newDateTime => {
              setDateTime(dayjs(newDateTime))
            }}
            style={styles.centerSelf}
            theme="light"
          />
        </Tabs.Tab>
        <Tabs.Tab label={formatDateToDisplay(dateTime, false)}>
          <DatePicker
            date={dateTime.toDate()}
            is24hourSource="locale"
            locale="nl-NL"
            maximumDate={maxDateTime
              ?.set('hours', dateTime.hour())
              .set('minute', dateTime.minute())
              .set('second', dateTime.second())
              .toDate()}
            minimumDate={justNow.toDate()}
            mode="date"
            onDateChange={newDateTime => {
              setDateTime(dayjs(newDateTime))
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
