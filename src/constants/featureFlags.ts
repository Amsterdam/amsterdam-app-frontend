export enum Features {
  WasteGuideNotifications = 'WasteGuideNotifications',
}

export const featureFlags: Partial<Record<Features, boolean>> = {
  [Features.WasteGuideNotifications]: false,
}
