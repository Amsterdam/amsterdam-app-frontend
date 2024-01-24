export const shouldShowUpdateSuggestion = (
  snoozeTimeInHours: number,
  lastSeenTimestamp?: number | null,
) => {
  if (!lastSeenTimestamp) {
    return true
  }

  return lastSeenTimestamp + snoozeTimeInHours * 3600000 < Date.now()
}
