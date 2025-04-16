import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {ParkingSessionAddLicensePlate} from '@/modules/parking/components/form/ParkingSessionAddLicensePlate'
import {ParkingSessionLicensePlateFormProvider} from '@/modules/parking/components/form/ParkingSessionLicensePlateFormProvider'
import {ParkingSessionSelectLicensePlate} from '@/modules/parking/components/form/ParkingSessionSelectLicensePlate'
import {ParkingSessionAddLicensePlateSubmitButton} from '@/modules/parking/components/form/bottomsheet/ParkingSessionAddLicensePlateSubmitButton'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'

export const ParkingSessionLicensePlateBottomSheetContent = () => {
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
