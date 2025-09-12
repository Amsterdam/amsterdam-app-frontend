import {type WasteType} from '@/modules/waste-guide/types'

export enum WasteGuideRouteName {
  wasteGuide = 'WasteGuide',
  wasteGuideCalendar = 'WasteGuideCalendar',
  wasteGuideFeedback = 'WasteGuideFeedback',
  wasteGuideFraction = 'WasteGuideFraction',
}

export type WasteGuideStackParams = {
  [WasteGuideRouteName.wasteGuide]: undefined
  [WasteGuideRouteName.wasteGuideCalendar]: undefined
  [WasteGuideRouteName.wasteGuideFeedback]: undefined
  [WasteGuideRouteName.wasteGuideFraction]: {
    fraction: WasteType
  }
}

export enum WasteGuideModalName {}

export type WasteGuideModalParams = Record<string, never>
