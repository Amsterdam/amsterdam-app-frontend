export const shouldShowUpdateSuggestion = (
  snoozeTimeInHours: number,
  lastSeenTimestamp?: number,
) => {
  if (!lastSeenTimestamp) {
    return true
  }

  return lastSeenTimestamp + snoozeTimeInHours * 3600000 < Date.now()
}
