import {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {DeviceRegistrationEndpointName} from '@/types/device'

/**
 * Used to prevent logging of expected API error responses.
 */
export const isExpectedError = (
  endpointName?: string,
  error?: FetchBaseQueryError,
) =>
  // unregisterDevice returns a 404 with body 'No record found', which means we tried to delete a device ID that does not exist anymore
  endpointName === DeviceRegistrationEndpointName.unregisterDevice &&
  error?.status === 404 &&
  error?.data === 'No record found'
