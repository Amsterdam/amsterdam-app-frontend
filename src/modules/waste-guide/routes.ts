export enum WasteGuideRouteName {
  user = 'WasteGuideUser',
  wasteGuide = 'WasteGuide',
  wasteGuideFeedback = 'WasteGuideFeedback',
}

export type WasteGuideStackParams = {
  [WasteGuideRouteName.user]: undefined
  [WasteGuideRouteName.wasteGuide]: undefined
  [WasteGuideRouteName.wasteGuideFeedback]: undefined
}

export enum WasteGuideModalName {}

export type WasteGuideModalParams = Record<string, never>
