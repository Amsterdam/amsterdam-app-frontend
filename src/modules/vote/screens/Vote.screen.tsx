import {FC} from 'react'
import {Screen} from '@/components/features/screen/Screen'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {SelectLocationTypeBottomSheetContent} from '@/modules/address/components/location/SelectLocationTypeBottomSheetContent'
import {PollingStationDetails} from '@/modules/vote/components/PollingStationDetails'
import {PollingStations} from '@/modules/vote/components/PollingStations'
import {PollingStationProvider} from '@/modules/vote/providers/PollingStation.provider'
import {PollingStationsListBottomSheetVariant} from '@/modules/vote/types'

export const VoteScreen = () => {
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
        testID="VoteScreen">
        <PollingStations />
      </Screen>
    </PollingStationProvider>
  )
}
