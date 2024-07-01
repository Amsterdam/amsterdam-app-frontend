import {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {isExpectedError} from '@/processes/logging/utils/isExpectedError'
import {DeviceRegistrationEndpointName} from '@/types/device'

describe('isExpectedError', () => {
  test('should return true for expected error', () => {
    const endpointName = DeviceRegistrationEndpointName.unregisterDevice
    const error: FetchBaseQueryError = {status: 404, data: 'No record found'}

    expect(isExpectedError(endpointName, error)).toBe(true)
  })

  test('should return false for unexpected error, based on endpoint', () => {
    const endpointName = DeviceRegistrationEndpointName.registerDevice
    const error: FetchBaseQueryError = {status: 404, data: 'No record found'}

    expect(isExpectedError(endpointName, error)).toBe(false)
  })

  test('should return false for unexpected error, based on code', () => {
    const endpointName = DeviceRegistrationEndpointName.unregisterDevice
    const error: FetchBaseQueryError = {status: 500, data: 'No record found'}

    expect(isExpectedError(endpointName, error)).toBe(false)
  })

  test('should return false for unexpected error, based on data', () => {
    const endpointName = DeviceRegistrationEndpointName.unregisterDevice
    const error: FetchBaseQueryError = {status: 404, data: 'Idk lol'}

    expect(isExpectedError(endpointName, error)).toBe(false)
  })
})
