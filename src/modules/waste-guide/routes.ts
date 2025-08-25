import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'

export enum WasteGuideRouteName {
  wasteGuide = 'WasteGuide',
  wasteGuideFeedback = 'WasteGuideFeedback',
  wasteGuideFraction = 'WasteGuideFraction',
}

export type WasteGuideStackParams = {
  [WasteGuideRouteName.wasteGuide]: undefined
  [WasteGuideRouteName.wasteGuideFeedback]: undefined
  [WasteGuideRouteName.wasteGuideFraction]: {
    fraction: WasteGuideResponseFraction
  }
}

export enum WasteGuideModalName {}

export type WasteGuideModalParams = Record<string, never>
