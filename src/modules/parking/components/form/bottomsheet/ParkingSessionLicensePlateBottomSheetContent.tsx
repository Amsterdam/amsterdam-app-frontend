import {useController} from 'react-hook-form'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ParkingSessionAddLicensePlate} from '@/modules/parking/components/form/ParkingSessionAddLicensePlate'
import {ParkingSessionLicensePlateFormProvider} from '@/modules/parking/components/form/ParkingSessionLicensePlateFormProvider'
import {ParkingSessionSelectLicensePlate} from '@/modules/parking/components/form/ParkingSessionSelectLicensePlate'
import {ParkingSessionAddLicensePlateSubmitButton} from '@/modules/parking/components/form/bottomsheet/ParkingSessionAddLicensePlateSubmitButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingLicensePlate} from '@/modules/parking/types'

export const ParkingSessionLicensePlateBottomSheetContent = () => {
  const currentPermit = useCurrentParkingPermit()

  const {
    field: {onChange},
  } = useController<{licensePlate?: ParkingLicensePlate}, 'licensePlate'>({
    name: 'licensePlate',
  })

  const {forced_license_plate_list} = currentPermit

  return (
    <Box grow>
      <ParkingSessionLicensePlateFormProvider>
        <Column
          grow={1}
          gutter="lg">
          {!forced_license_plate_list && <ParkingSessionAddLicensePlate />}
          {!forced_license_plate_list && (
            <ParkingSessionAddLicensePlateSubmitButton
              setLicensePlate={onChange}
            />
          )}
          <ParkingSessionSelectLicensePlate setLicensePlate={onChange} />
        </Column>
      </ParkingSessionLicensePlateFormProvider>
    </Box>
  )
}
