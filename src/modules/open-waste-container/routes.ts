export enum OpenWasteContainerRouteName {
  addWasteCard = 'AddWasteCard',
  openWasteContainer = 'OpenWasteContainer',
}

export type OpenWasteContainerStackParams = {
  [OpenWasteContainerRouteName.addWasteCard]: undefined
  [OpenWasteContainerRouteName.openWasteContainer]: undefined
}

export enum OpenWasteContainerModalName {}

export type OpenWasteContainerModalParams = Record<string, never>
