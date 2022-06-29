export enum WasteGuideRouteName {
  bulkyWasteAppointment = 'BulkyWasteAppointment',
  recyclingGuide = 'RecyclingGuide',
  reportNotCollected = 'ReportNotCollected',
  wasteGuide = 'WasteGuide',
  wasteGuideCollectionPoints = 'WasteGuideCollectionPoints',
  wasteGuideContainers = 'WasteGuideContainers',
  wasteGuideFeedback = 'WasteGuideFeedback',
  wasteMenu = 'WasteMenu',
  whereToPutBulkyWaste = 'WhereToPutBulkyWaste',
}

export type WasteGuideStackParams = {
  [WasteGuideRouteName.bulkyWasteAppointment]: {appointmentUrl: string}
  [WasteGuideRouteName.recyclingGuide]: undefined
  [WasteGuideRouteName.reportNotCollected]: undefined
  [WasteGuideRouteName.wasteGuide]: undefined
  [WasteGuideRouteName.wasteGuideCollectionPoints]: undefined
  [WasteGuideRouteName.wasteGuideContainers]: undefined
  [WasteGuideRouteName.wasteGuideFeedback]: undefined
  [WasteGuideRouteName.wasteMenu]: undefined
  [WasteGuideRouteName.whereToPutBulkyWaste]: undefined
}
