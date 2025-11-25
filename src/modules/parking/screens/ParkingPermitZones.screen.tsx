import {type FC} from 'react'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {usePreviousRoute} from '@/hooks/navigation/usePreviousRoute'
import {SelectLocationTypeBottomSheetContent} from '@/modules/address/components/location/SelectLocationTypeBottomSheetContent'
import {ParkingMachineBottomSheetContent} from '@/modules/parking/components/permit-zone/ParkingMachineBottomSheetContent'
import {ParkingPermitZone} from '@/modules/parking/components/permit-zone/ParkingPermitZone'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'
import {PermitMapProvider} from '@/modules/parking/providers/PermitMapProvider'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingPermitZonesBottomSheetVariant} from '@/modules/parking/types'

const variantMap: Record<ParkingPermitZonesBottomSheetVariant, FC> = {
  [ParkingPermitZonesBottomSheetVariant.address]:
    SelectLocationTypeBottomSheetContent,
  [ParkingPermitZonesBottomSheetVariant.parkingMachine]:
    ParkingMachineBottomSheetContent,
}

const ParkingPermitZonesScreenInner = () => {
  const {permit_zone} = useCurrentParkingPermit()
  const {name: previousRouteName} = usePreviousRoute() ?? {}

  return (
    <PermitMapProvider>
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
        <ParkingPermitZone
          variant={
            previousRouteName === ParkingRouteName.startSession
              ? 'search'
              : 'list'
          }
        />
      </Screen>
    </PermitMapProvider>
  )
}

export const ParkingPermitZonesScreen = () => (
  <CurrentPermitProvider>
    <ParkingPermitZonesScreenInner />
  </CurrentPermitProvider>
)
