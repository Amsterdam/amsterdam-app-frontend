export const hasSnoozeTimeInMillisecondsPassed = (
  snoozeTimeInSeconds: number,
  lastSeenTimestamp?: number | null,
) => {
  if (!lastSeenTimestamp) {
    return true
  }

  return lastSeenTimestamp + snoozeTimeInSeconds < Date.now()
}

export const hasSnoozeTimeInSecondsPassed = (
  snoozeTimeInSeconds: number,
  lastSeenTimestamp?: number | null,
) =>
  hasSnoozeTimeInMillisecondsPassed(
    snoozeTimeInSeconds * 1000,
    lastSeenTimestamp,
  )

export const hasSnoozeTimeInHoursPassed = (
  snoozeTimeInHours: number,
  lastSeenTimestamp?: number | null,
) =>
  hasSnoozeTimeInMillisecondsPassed(
    snoozeTimeInHours * 3600000,
    lastSeenTimestamp,
  )
