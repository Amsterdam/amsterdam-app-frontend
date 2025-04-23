import {useController, useFormContext} from 'react-hook-form'
import {View} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Title} from '@/components/ui/text/Title'
import {useKeyboardHeight} from '@/hooks/useKeyboardHeight'
import {ParkingSessionDateTime} from '@/modules/parking/components/form/bottomsheet/ParkingSessionDateTime'
import {ParkingSessionDurationTimePicker} from '@/modules/parking/components/form/bottomsheet/ParkingSessionDurationTimePicker'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {type Dayjs} from '@/utils/datetime/dayjs'

type FieldValues = {endTime?: Dayjs; startTime: Dayjs}

export const ParkingSessionEndTimeBottomSheetContent = () => {
  const {watch} = useFormContext<FieldValues>()
  const startTime = watch('startTime')
  const {
    field: {value: endTime, onChange},
  } = useController<FieldValues, 'endTime'>({
    name: 'endTime',
  })
  const {close} = useBottomSheet()

  const {currentPermit, isLoading} = useGetCurrentParkingPermit()

  const {height: keyboardHeight, visible: keyboardVisible} = useKeyboardHeight()

  if (isLoading) {
    return (
      <PleaseWait testID="ParkingSessionPaymentZoneBottomSheetContentPleaseWait" />
    )
  }

  if (!currentPermit) {
    return (
      <SomethingWentWrong testID="ParkingSessionPaymentZoneBottomSheetContentSomethingWentWrong" />
    )
  }

  const {max_session_length_in_days} = currentPermit

  return (
    <Box grow>
      {max_session_length_in_days === 1 ? (
        <ParkingSessionDurationTimePicker currentPermit={currentPermit} />
      ) : (
        <>
          <Title
            level="h5"
            text="Selecteer eindtijd"
            textAlign="center"
          />
          <ParkingSessionDateTime
            dateTime={endTime ?? startTime}
            setDateTime={onChange}
          />
        </>
      )}

      <Button
        label="Gereed"
        onPress={close}
        testID="ParkingSessionEndTimeBottomSheetContentDoneButton"
      />
      {!!keyboardVisible && <View style={{height: keyboardHeight}} />}
    </Box>
  )
}
