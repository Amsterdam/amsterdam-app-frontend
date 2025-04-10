import {useContext, useMemo} from 'react'
import {StyleSheet} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {RadioGroup} from '@/components/ui/forms/RadioGroup'
import {Column} from '@/components/ui/layout/Column'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'
import {dayjs} from '@/utils/datetime/dayjs'
import {isToday} from '@/utils/datetime/isToday'
import {roundDownPer5Minutes} from '@/utils/datetime/roundDownPer5Minutes'

export const ParkingSessionTodayTomorrowStartTime = () => {
  const {startTime, setStartTime, endTime, setEndTime} = useContext(
    ParkingSessionContext,
  )
  const justNow = useMemo(roundDownPer5Minutes, [])

  return (
    <Column>
      <RadioGroup
        onChange={value => {
          let newStartTime = startTime
          const today = dayjs()

          newStartTime = newStartTime
            .set('date', today.date())
            .set('month', today.month())
            .set('year', today.year())

          if (value !== 'Today') {
            newStartTime = newStartTime.add(1, 'day')
          }

          setStartTime(newStartTime)

          if (endTime) {
            const newEndTime = endTime
              .set('date', newStartTime.date())
              .set('month', newStartTime.month())
              .set('year', newStartTime.year())

            setEndTime(newEndTime)
          }
        }}
        options={[
          {label: 'Vandaag', value: 'Today'},
          {label: 'Morgen', value: 'Tomorrow'},
        ]}
        testID="ParkingSessionTodayTomorrowStartTime"
        value={isToday(startTime) ? 'Today' : 'Tomorrow'}
      />
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
    </Column>
  )
}

const styles = StyleSheet.create({
  centerSelf: {
    alignSelf: 'center',
  },
})
