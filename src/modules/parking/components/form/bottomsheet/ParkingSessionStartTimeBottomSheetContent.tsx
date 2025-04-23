import {useController} from 'react-hook-form'
import {View} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Title} from '@/components/ui/text/Title'
import {useKeyboardHeight} from '@/hooks/useKeyboardHeight'
import {ParkingSessionDateTime} from '@/modules/parking/components/form/bottomsheet/ParkingSessionDateTime'
import {ParkingSessionTodayTomorrowStartTime} from '@/modules/parking/components/form/bottomsheet/ParkingSessionTodayTomorrowStartTime'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {type Dayjs} from '@/utils/datetime/dayjs'

export const ParkingSessionStartTimeBottomSheetContent = () => {
  const {currentPermit, isLoading} = useGetCurrentParkingPermit()
  const {
    field: {value: startTime, onChange},
  } = useController<{startTime: Dayjs}, 'startTime'>({
    name: 'startTime',
  })
  const {close} = useBottomSheet()
  const {height: keyboardHeight, visible: keyboardVisible} = useKeyboardHeight()

  if (isLoading) {
    return (
      <PleaseWait testID="ParkingSessionStartTimeBottomSheetContentPleaseWait" />
    )
  }

  if (!currentPermit) {
    return (
      <SomethingWentWrong testID="ParkingSessionStartTimeBottomSheetContentSomethingWentWrong" />
    )
  }

  const {max_session_length_in_days} = currentPermit

  return (
    <Box grow>
      <Title
        level="h5"
        text="Selecteer starttijd"
        textAlign="center"
      />
      {max_session_length_in_days === 1 ? (
        <ParkingSessionTodayTomorrowStartTime />
      ) : (
        <ParkingSessionDateTime
          dateTime={startTime}
          setDateTime={onChange}
        />
      )}
      <Button
        label="Gereed"
        onPress={close}
        testID="ParkingSessionStartTimeBottomSheetContentDoneButton"
      />
      {!!keyboardVisible && <View style={{height: keyboardHeight}} />}
    </Box>
  )
}
