import {useContext, useMemo} from 'react'
import {StyleSheet} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {Tabs} from '@/components/ui/Tabs' // Updated import
import {Column} from '@/components/ui/layout/Column'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'
import {roundDownPer5Minutes} from '@/utils/datetime/roundDownPer5Minutes'

export const ParkingSessionDateStartTime = () => {
  const {startTime, setStartTime} = useContext(ParkingSessionContext)
  const justNow = useMemo(roundDownPer5Minutes, [])

  return (
    <Column grow={1}>
      <Tabs>
        <Tabs.Tab
          label={formatTimeToDisplay(startTime, {
            hoursLabelShort: true,
            includeHoursLabel: true,
          })}>
          <DatePicker
            date={startTime.toDate()}
            is24hourSource="locale"
            locale="nl-NL"
            minimumDate={justNow.toDate()}
            mode="time"
            onDateChange={newStartTime => {
              setStartTime(dayjs(newStartTime))
            }}
            style={styles.centerSelf}
          />
        </Tabs.Tab>
        <Tabs.Tab label={formatDateToDisplay(startTime, false)}>
          <DatePicker
            date={startTime.toDate()}
            is24hourSource="locale"
            locale="nl-NL"
            minimumDate={justNow.toDate()}
            mode="date"
            onDateChange={newStartTime => {
              setStartTime(dayjs(newStartTime))
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
