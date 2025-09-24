import {FC} from 'react'
import {Screen} from '@/components/features/screen/Screen'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {SelectLocationTypeBottomSheetContent} from '@/modules/address/components/location/SelectLocationTypeBottomSheetContent'
import {PollingStationDetails} from '@/modules/elections/components/PollingStationDetails'
import {PollingStations} from '@/modules/elections/components/PollingStations'
import {PollingStationProvider} from '@/modules/elections/providers/PollingStation.provider'
import {PollingStationsListBottomSheetVariant} from '@/modules/elections/types'

export const ElectionsScreen = () => {
  const variantMap: Record<PollingStationsListBottomSheetVariant, FC> = {
    [PollingStationsListBottomSheetVariant.address]:
      SelectLocationTypeBottomSheetContent,
    [PollingStationsListBottomSheetVariant.pollingStation]:
      PollingStationDetails,
  }

  return (
    <PollingStationProvider>
      <Screen
        bottomSheet={
          <BottomSheet
            testID="PollingStationBottomSheet"
            variants={variantMap}
          />
        }
        scroll={false}
        testID="ElectionsScreen">
        <PollingStations />
      </Screen>
    </PollingStationProvider>
  )
}
