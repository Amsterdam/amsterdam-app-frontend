import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {ParkingSessionAddLicensePlate} from '@/modules/parking/components/session/ParkingSessionAddLicensePlate'
import {ParkingSessionAddLicensePlateSubmitButton} from '@/modules/parking/components/session/ParkingSessionAddLicensePlateSubmitButton'
import {ParkingSessionLicensePlateFormProvider} from '@/modules/parking/components/session/ParkingSessionLicensePlateFormProvider'
import {ParkingSessionSelectLicensePlate} from '@/modules/parking/components/session/ParkingSessionSelectLicensePlate'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'

const ParkingSessionLicensePlateBottomSheetContent = () => {
  const {currentPermit, isLoading} = useGetCurrentParkingPermit()

  if (isLoading) {
    return (
      <PleaseWait testID="ParkingSessionLicensePlateBottomSheetPleaseWait" />
    )
  }

  if (!currentPermit) {
    return (
      <SomethingWentWrong testID="ParkingSessionLicensePlateBottomSheetSomethingWentWrong" />
    )
  }

  const {forced_license_plate_list} = currentPermit

  return (
    <Box grow>
      <ParkingSessionLicensePlateFormProvider>
        <Column
          grow={1}
          gutter="lg">
          {!forced_license_plate_list && <ParkingSessionAddLicensePlate />}
          {!forced_license_plate_list && (
            <ParkingSessionAddLicensePlateSubmitButton />
          )}
          <ParkingSessionSelectLicensePlate />
        </Column>
      </ParkingSessionLicensePlateFormProvider>
    </Box>
  )
}

export const ParkingSessionLicensePlateBottomSheet = () => (
  <BottomSheet
    flex={1}
    scroll
    snapPoints={['100%']}
    testID="ParkingSelectPermitBottomSheet">
    <ParkingSessionLicensePlateBottomSheetContent />
  </BottomSheet>
)
