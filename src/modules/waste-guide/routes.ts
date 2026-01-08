import {type FractionCode} from '@/modules/waste-guide/types'

export enum WasteGuideRouteName {
  wasteGuide = 'WasteGuide',
  wasteGuideCalendar = 'WasteGuideCalendar',
  wasteGuideFeedback = 'WasteGuideFeedback',
  wasteGuideFraction = 'WasteGuideFraction',
}

export type WasteGuideStackParams = {
  [WasteGuideRouteName.wasteGuide]: {adres: string} | undefined
  [WasteGuideRouteName.wasteGuideCalendar]: undefined
  [WasteGuideRouteName.wasteGuideFeedback]: undefined
  [WasteGuideRouteName.wasteGuideFraction]: {
    fractionCode: FractionCode
  }
}

export enum WasteGuideModalName {}

export type WasteGuideModalParams = Record<string, never>
