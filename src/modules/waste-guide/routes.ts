export enum WasteGuideRouteName {
  bulkyWasteAppointment = 'BulkyWasteAppointment',
  wasteGuide = 'WasteGuide',
  wasteGuideCollectionPoints = 'WasteGuideCollectionPoints',
  wasteGuideContainers = 'WasteGuideContainers',
  wasteGuideFeedback = 'WasteGuideFeedback',
  whereToPutBulkyWaste = 'WhereToPutBulkyWaste',
}

export type WasteGuideStackParams = {
  [WasteGuideRouteName.bulkyWasteAppointment]: {url: string}
  [WasteGuideRouteName.wasteGuide]: undefined
  [WasteGuideRouteName.wasteGuideCollectionPoints]: {lat: number; lon: number}
  [WasteGuideRouteName.wasteGuideContainers]: {lat: number; lon: number}
  [WasteGuideRouteName.wasteGuideFeedback]: undefined
  [WasteGuideRouteName.whereToPutBulkyWaste]: undefined
}

export enum WasteGuideModalName {}

export type WasteGuideModalParams = Record<string, never>
