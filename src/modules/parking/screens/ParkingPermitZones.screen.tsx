import type {FC} from 'react'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {SelectLocationTypeBottomSheetContent} from '@/modules/address/components/location/SelectLocationTypeBottomSheetContent'
import {ParkingMachineDetails} from '@/modules/parking/components/permit-zone/ParkingMachineDetails'
import {ParkingPermitZone} from '@/modules/parking/components/permit-zone/ParkingPermitZone'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'
import {ParkingPermitZonesBottomSheetVariant} from '@/modules/parking/types'

export const ParkingPermitZonesScreenInner = () => {
  const {permit_zone} = useCurrentParkingPermit()

  const variantMap: Record<ParkingPermitZonesBottomSheetVariant, FC> = {
    [ParkingPermitZonesBottomSheetVariant.address]:
      SelectLocationTypeBottomSheetContent,
    [ParkingPermitZonesBottomSheetVariant.parkingMachine]:
      ParkingMachineDetails,
  }

  return (
    <Screen
      bottomSheet={
        <BottomSheet
          scroll
          testID="ParkingPermitZonesBottomSheet"
          variants={variantMap}
        />
      }
      headerOptions={{
        headerTitle: permit_zone.name,
      }}
      scroll={false}
      testID="ParkingPermitZonesScreen"
      withBottomInset={false}>
      <ParkingPermitZone />
    </Screen>
  )
}

export const ParkingPermitZonesScreen = () => (
  <CurrentPermitProvider>
    <ParkingPermitZonesScreenInner />
  </CurrentPermitProvider>
)
