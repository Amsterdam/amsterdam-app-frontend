export enum Features {
  BurningGuideNotifications = 'BurningGuideNotifications',
  WasteGuideNotifications = 'WasteGuideNotifications',
}

export const featureFlags: Partial<Record<Features, boolean>> = {
  [Features.BurningGuideNotifications]: false,
}
