import {useContext} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionContext} from '@/modules/parking/components/form/ParkingSessionProvider'
import {ParkingSessionDateTime} from '@/modules/parking/components/form/bottomsheet/ParkingSessionDateTime'
import {ParkingSessionDurationTimePicker} from '@/modules/parking/components/form/bottomsheet/ParkingSessionDurationTimePicker'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingSessionEndTimeBottomSheetContent = () => {
  const {startTime, endTime, setEndTime} = useContext(ParkingSessionContext)
  const {close} = useBottomSheet()

  const {currentPermit, isLoading} = useGetCurrentParkingPermit()

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
            setDateTime={setEndTime}
          />
        </>
      )}

      <Button
        label="Gereed"
        onPress={close}
        testID="ParkingSessionEndTimeBottomSheetContentDoneButton"
      />
    </Box>
  )
}
