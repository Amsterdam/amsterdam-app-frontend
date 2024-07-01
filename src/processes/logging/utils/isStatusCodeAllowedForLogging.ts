const DISALLOWED_STATUS_CODES_FOR_LOGGING = [0, '0']

/**
 * Filter out status codes for which we do not want to log and undefined status codes
 */
export const isStatusCodeAllowedForLogging = (
  status: string | number | undefined,
) =>
  status !== undefined && !DISALLOWED_STATUS_CODES_FOR_LOGGING.includes(status)
