import {type FC} from 'react'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {ParkingSessionAmountBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSessionAmountBottomSheetContent'
import {ParkingSessionEndTimeBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSessionEndTimeBottomSheetContent'
import {ParkingSessionLicensePlateBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSessionLicensePlateBottomSheetContent'
import {ParkingSessionPaymentZoneBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSessionPaymentZoneBottomSheetContent'
import {ParkingSessionStartTimeBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSessionStartTimeBottomSheetContent'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {ParkingPermitZonesBottomSheetVariant} from '@/modules/parking/types'
import {useBottomSheetSelectors} from '@/store/slices/bottomSheet'

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
  const {variant} = useBottomSheetSelectors()

  if (variant === ParkingPermitZonesBottomSheetVariant.parkingMachine) {
    return null
  }

  return (
    <BottomSheet
      scroll={
        variant !== ParkingSessionBottomSheetVariant.startTime &&
        variant !== ParkingSessionBottomSheetVariant.endTime
      }
      testID="ParkingSessionBottomSheet"
      variants={variantMap}
    />
  )
}
