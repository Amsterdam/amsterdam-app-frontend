import {isStatusCodeAllowedForLogging} from '@/processes/logging/utils/isStatusCodeAllowedForLogging'

describe('isStatusCodeAllowedForLogging', () => {
  test('should return false for disallowed status code', () => {
    expect(isStatusCodeAllowedForLogging(0)).toBe(false)
  })

  test('should return true for allowed status code', () => {
    expect(isStatusCodeAllowedForLogging(200)).toBe(true)
  })

  test('should return false for disallowed status code as string', () => {
    expect(isStatusCodeAllowedForLogging('0')).toBe(false)
  })

  test('should return true for allowed status code as string', () => {
    expect(isStatusCodeAllowedForLogging('200')).toBe(true)
  })

  test('should return false for undefined status code', () => {
    expect(isStatusCodeAllowedForLogging(undefined)).toBe(false)
  })
})
