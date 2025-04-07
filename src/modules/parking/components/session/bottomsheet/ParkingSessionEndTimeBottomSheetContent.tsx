import {useContext} from 'react'
import {StyleSheet} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {Tabs} from '@/components/ui/Tabs'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {TimeDurationSpinner} from '@/components/ui/forms/TimeDurationSpinner'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'

export const ParkingSessionEndTimeBottomSheetContent = () => {
  const {startTime, endTime, setEndTime} = useContext(ParkingSessionContext)
  const {close} = useBottomSheet()

  return (
    <Box grow>
      <Column
        gutter="lg"
        halign="center">
        <Title
          level="h5"
          text="Eindtijd"
        />
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
          <Gutter height="lg" />
          <TimeDurationSpinner
            onChange={(hours, minutes) => {
              const newEndTime = startTime
                .add(hours, 'hour')
                .add(minutes, 'minute')

              setEndTime(newEndTime)
            }}
          />
          <Gutter height="lg" />
        </Tabs.Tab>
        <Tabs.Tab label="Eindtijd">
          <DatePicker
            date={endTime?.toDate() ?? startTime.toDate()}
            is24hourSource="locale"
            locale="nl-NL"
            minimumDate={startTime.toDate()}
            mode="time"
            onDateChange={newStartTime => {
              setEndTime(dayjs(newStartTime))
            }}
            style={styles.centerSelf}
          />
        </Tabs.Tab>
      </Tabs>

      <Button
        label="Gereed"
        onPress={close}
        testID="ParkingSessionEndTimeBottomSheetContentDoneButton"
      />
    </Box>
  )
}

const styles = StyleSheet.create({
  centerSelf: {
    alignSelf: 'center',
  },
})
