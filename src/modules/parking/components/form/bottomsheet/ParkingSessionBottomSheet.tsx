import {type FC, useContext} from 'react'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {ParkingSessionContext} from '@/modules/parking/components/form/ParkingSessionProvider'
import {ParkingSessionAmountBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSessionAmountBottomSheetContent'
import {ParkingSessionEndTimeBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSessionEndTimeBottomSheetContent'
import {ParkingSessionLicensePlateBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSessionLicensePlateBottomSheetContent'
import {ParkingSessionPaymentZoneBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSessionPaymentZoneBottomSheetContent'
import {ParkingSessionStartTimeBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSessionStartTimeBottomSheetContent'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'

const variantMap: Record<ParkingSessionBottomSheetVariant, FC> = {
  [ParkingSessionBottomSheetVariant.licensePlate]:
    ParkingSessionLicensePlateBottomSheetContent,
  [ParkingSessionBottomSheetVariant.startTime]:
    ParkingSessionStartTimeBottomSheetContent,
  [ParkingSessionBottomSheetVariant.endTime]:
    ParkingSessionEndTimeBottomSheetContent,
  [ParkingSessionBottomSheetVariant.paymentZone]:
    ParkingSessionPaymentZoneBottomSheetContent,
  [ParkingSessionBottomSheetVariant.amount]:
    ParkingSessionAmountBottomSheetContent,
}

export const ParkingSessionBottomSheet = () => {
  const {bottomSheetVariant} = useContext(ParkingSessionContext)
  const Component = variantMap[bottomSheetVariant] ?? (() => null)

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
