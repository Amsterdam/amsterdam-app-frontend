export enum WasteGuideRouteName {
  wasteGuide = 'WasteGuide',
  wasteGuideFeedback = 'WasteGuideFeedback',
}

export type WasteGuideStackParams = {
  [WasteGuideRouteName.wasteGuide]: undefined
  [WasteGuideRouteName.wasteGuideFeedback]: undefined
}

export enum WasteGuideModalName {}

export type WasteGuideModalParams = Record<string, never>
