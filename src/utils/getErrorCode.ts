export const getErrorCode = (error: unknown) =>
  (error as {originalStatus: number})?.originalStatus ?? undefined
