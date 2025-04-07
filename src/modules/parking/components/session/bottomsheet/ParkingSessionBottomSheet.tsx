import {useContext} from 'react'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {ParkingSessionEndTimeBottomSheetContent} from '@/modules/parking/components/session/bottomsheet/ParkingSessionEndTimeBottomSheetContent'
import {ParkingSessionLicensePlateBottomSheetContent} from '@/modules/parking/components/session/bottomsheet/ParkingSessionLicensePlateBottomSheetContent'
import {ParkingSessionStartTimeBottomSheetContent} from '@/modules/parking/components/session/bottomsheet/ParkingSessionStartTimeBottomSheetContent'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'

export const ParkingSessionBottomSheet = () => {
  const {bottomSheetVariant} = useContext(ParkingSessionContext)

  return (
    <BottomSheet
      scroll={
        bottomSheetVariant === ParkingSessionBottomSheetVariant.licensePlate
      }
      testID="ParkingSelectPermitBottomSheet">
      {bottomSheetVariant === ParkingSessionBottomSheetVariant.licensePlate ? (
        <ParkingSessionLicensePlateBottomSheetContent />
      ) : bottomSheetVariant === ParkingSessionBottomSheetVariant.startTime ? (
        <ParkingSessionStartTimeBottomSheetContent />
      ) : bottomSheetVariant === ParkingSessionBottomSheetVariant.endTime ? (
        <ParkingSessionEndTimeBottomSheetContent />
      ) : null}
    </BottomSheet>
  )
}
