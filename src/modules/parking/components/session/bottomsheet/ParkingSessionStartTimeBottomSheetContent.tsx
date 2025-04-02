import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionDateStartTime} from '@/modules/parking/components/session/bottomsheet/ParkingSessionDateStartTime'
import {ParkingSessionTodayTomorrowStartTime} from '@/modules/parking/components/session/bottomsheet/ParkingSessionTodayTomorrowStartTime'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {PermitType} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

const isPermitTypeTodayTomorrowStartTime = (permitType: PermitType) =>
  [PermitType.bezoekersvergunning, PermitType.kraskaartvergunning].includes(
    permitType,
  )

export const ParkingSessionStartTimeBottomSheetContent = () => {
  const {currentPermit, isLoading} = useGetCurrentParkingPermit()
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

  const {permit_type} = currentPermit

  return (
    <Box grow>
      <Title
        level="h5"
        text="Selecteer starttijd"
        textAlign="center"
      />
      {isPermitTypeTodayTomorrowStartTime(permit_type) ? (
        <ParkingSessionTodayTomorrowStartTime />
      ) : (
        <ParkingSessionDateStartTime />
      )}
      <Button
        label="Gereed"
        onPress={close}
        testID="ParkingSessionStartTimeBottomSheetContentDoneButton"
      />
    </Box>
  )
}
