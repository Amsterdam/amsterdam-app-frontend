import {useContext} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionDateTime} from '@/modules/parking/components/session/bottomsheet/ParkingSessionDateTime'
import {ParkingSessionTodayTomorrowStartTime} from '@/modules/parking/components/session/bottomsheet/ParkingSessionTodayTomorrowStartTime'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingSessionStartTimeBottomSheetContent = () => {
  const {currentPermit, isLoading} = useGetCurrentParkingPermit()
  const {startTime, setStartTime} = useContext(ParkingSessionContext)
  const {close} = useBottomSheet()

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
          setDateTime={setStartTime}
        />
      )}
      <Button
        label="Gereed"
        onPress={close}
        testID="ParkingSessionStartTimeBottomSheetContentDoneButton"
      />
    </Box>
  )
}
