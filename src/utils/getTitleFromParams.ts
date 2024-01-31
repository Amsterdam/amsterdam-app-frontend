export const getTitleFromParams = (params?: Record<string, unknown>) =>
  (params?.screenTitle ?? params?.screenHeaderTitle) as string | undefined
