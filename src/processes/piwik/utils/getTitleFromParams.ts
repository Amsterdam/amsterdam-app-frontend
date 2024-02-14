export const getTitleFromParams = (params?: Record<string, unknown>) => {
  const title = (params?.screenTitle ?? params?.screenHeaderTitle) as
    | string
    | undefined

  if (!title) {
    return
  }

  return decodeURIComponent(title)
}
