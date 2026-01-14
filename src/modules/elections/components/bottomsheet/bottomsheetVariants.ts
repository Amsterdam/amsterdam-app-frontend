import type {FC} from 'react'
import {PollingStationDetails} from '@/modules/elections/components/bottomsheet/PollingStationDetails'
import {PollingStationsMapLegend} from '@/modules/elections/components/bottomsheet/PolllingStationsMapLegend'

export enum PollingStationsBottomSheetVariant {
  legend = 'legend',
  pollingStationDetails = 'pollingStationDetails',
}

export const bottomsheetVariants: Record<
  PollingStationsBottomSheetVariant,
  FC
> = {
  [PollingStationsBottomSheetVariant.pollingStationDetails]:
    PollingStationDetails,
  [PollingStationsBottomSheetVariant.legend]: PollingStationsMapLegend,
}
