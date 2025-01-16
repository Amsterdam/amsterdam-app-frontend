export enum WasteContainerRouteName {
  addWasteCard = 'AddWasteCard',
  wasteCard = 'WasteCard',
}

export type WasteContainerStackParams = {
  [WasteContainerRouteName.addWasteCard]: undefined
  [WasteContainerRouteName.wasteCard]: undefined
}

export enum WasteContainerModalName {
  addWasteCardSuccess = 'AddWasteCardSuccess',
}

export type WasteContainerModalParams = {
  [WasteContainerModalName.addWasteCardSuccess]: undefined
}
