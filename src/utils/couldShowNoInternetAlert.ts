export const couldShowNoInternetAlert = (
  snoozeTimeInSeconds: number,
  lastSeenTimestamp?: number | null,
) => {
  if (!lastSeenTimestamp) {
    return true
  }

  return lastSeenTimestamp + snoozeTimeInSeconds * 1000 < Date.now()
}
