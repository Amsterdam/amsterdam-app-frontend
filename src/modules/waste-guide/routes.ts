export enum WasteGuideRouteName {
  bulkyWasteAppointment = 'BulkyWasteAppointment',
  wasteGuide = 'WasteGuide',
  wasteGuideCollectionPoints = 'WasteGuideCollectionPoints',
  wasteGuideContainers = 'WasteGuideContainers',
  wasteGuideFeedback = 'WasteGuideFeedback',
  whereToPutBulkyWaste = 'WhereToPutBulkyWaste',
}

export type WasteGuideStackParams = {
  [WasteGuideRouteName.bulkyWasteAppointment]: {appointmentUrl: string}
  [WasteGuideRouteName.wasteGuide]: undefined
  [WasteGuideRouteName.wasteGuideCollectionPoints]: undefined
  [WasteGuideRouteName.wasteGuideContainers]: {lon: number; lat: number}
  [WasteGuideRouteName.wasteGuideFeedback]: undefined
  [WasteGuideRouteName.whereToPutBulkyWaste]: undefined
}

export enum WasteGuideModalName {}

export type WasteGuideModalParams = Record<string, never>
