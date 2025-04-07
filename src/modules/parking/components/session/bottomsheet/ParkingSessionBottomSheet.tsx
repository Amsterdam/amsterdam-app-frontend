import {type FC, useContext} from 'react'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {ParkingSessionEndTimeBottomSheetContent} from '@/modules/parking/components/session/bottomsheet/ParkingSessionEndTimeBottomSheetContent'
import {ParkingSessionLicensePlateBottomSheetContent} from '@/modules/parking/components/session/bottomsheet/ParkingSessionLicensePlateBottomSheetContent'
import {ParkingSessionPaymentZoneBottomSheetContent} from '@/modules/parking/components/session/bottomsheet/ParkingSessionPaymentZoneBottomSheetContent'
import {ParkingSessionStartTimeBottomSheetContent} from '@/modules/parking/components/session/bottomsheet/ParkingSessionStartTimeBottomSheetContent'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'

const variantMap: Record<ParkingSessionBottomSheetVariant, FC> = {
  [ParkingSessionBottomSheetVariant.licensePlate]:
    ParkingSessionLicensePlateBottomSheetContent,
  [ParkingSessionBottomSheetVariant.startTime]:
    ParkingSessionStartTimeBottomSheetContent,
  [ParkingSessionBottomSheetVariant.endTime]:
    ParkingSessionEndTimeBottomSheetContent,
  [ParkingSessionBottomSheetVariant.paymentZone]:
    ParkingSessionPaymentZoneBottomSheetContent,
}

export const ParkingSessionBottomSheet = () => {
  const {bottomSheetVariant} = useContext(ParkingSessionContext)
  const Component = variantMap[bottomSheetVariant]

  return (
    <BottomSheet
      scroll={
        bottomSheetVariant === ParkingSessionBottomSheetVariant.licensePlate
      }
      testID="ParkingSelectPermitBottomSheet">
      <Component />
    </BottomSheet>
  )
}
