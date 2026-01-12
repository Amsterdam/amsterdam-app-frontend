import type {FC} from 'react'
import {MapSheetVariants} from '@/components/features/map/constants'
import {PollingStationDetails} from '@/modules/elections/components/bottomsheet/PollingStationDetails'
import {PollingStationsMapLegend} from '@/modules/elections/components/bottomsheet/PolllingStationsMapLegend'

export enum PollingStationsBottomSheetVariant {
  pollingStationDetails = 'pollingStationDetails',
}

export const bottomsheetVariants: Record<
  PollingStationsBottomSheetVariant & {legend: MapSheetVariants.legend},
  FC
> = {
  [PollingStationsBottomSheetVariant.pollingStationDetails]:
    PollingStationDetails,
  [MapSheetVariants.legend]: PollingStationsMapLegend,
}
