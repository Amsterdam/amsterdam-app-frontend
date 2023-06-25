import {isNumericString, isValidVersionString, versionCompare} from './version'

describe('isNumericString', () => {
  test('should return true for numeric strings', () => {
    expect(isNumericString('123')).toBe(true)
    expect(isNumericString('-456')).toBe(true)
    expect(isNumericString('0')).toBe(true)
    expect(isNumericString('3.14')).toBe(true)
  })
  test('should return false for non-numeric strings', () => {
    expect(isNumericString('abc')).toBe(false)
    expect(isNumericString('123abc')).toBe(false)
    expect(isNumericString('abc123')).toBe(false)
    expect(isNumericString('')).toBe(false)
  })
  test('should return false for non-string values', () => {
    // @ts-ignore
    expect(isNumericString(123)).toBe(false)
    // @ts-ignore
    expect(isNumericString(null)).toBe(false)
    // @ts-ignore
    expect(isNumericString(undefined)).toBe(false)
    // @ts-ignore
    expect(isNumericString(true)).toBe(false)
  })
})

describe('isValidVersionString', () => {
  test('should return true for valid version strings', () => {
    expect(isValidVersionString('1.0.0')).toBe(true)
    expect(isValidVersionString('0.0.1')).toBe(true)
    expect(isValidVersionString('2.3.10')).toBe(true)
    expect(isValidVersionString('10.0.0.1')).toBe(true)
  })
  test('should return false for invalid version strings', () => {
    expect(isValidVersionString('a')).toBe(false)
    expect(isValidVersionString('@')).toBe(false)
    expect(isValidVersionString('')).toBe(false)
  })
  test('should return false for non-string values', () => {
    expect(isValidVersionString()).toBe(false)
    // @ts-ignore
    expect(isValidVersionString(null)).toBe(false)
    // @ts-ignore
    expect(isValidVersionString(123)).toBe(false)
    // @ts-ignore
    expect(isValidVersionString(true)).toBe(false)
  })
})

describe('versionCompare', () => {
  test('should return 1 if version A is higher', () => {
    expect(versionCompare('2.0.0', '1.0.0')).toBe(1)
    expect(versionCompare('1.1.0', '1.0.0')).toBe(1)
    expect(versionCompare('1.0.1', '1.0.0')).toBe(1)
  })
  test('should return -1 if version B is higher', () => {
    expect(versionCompare('1.0.0', '2.0.0')).toBe(-1)
    expect(versionCompare('1.0.0', '1.1.0')).toBe(-1)
    expect(versionCompare('1.0.0', '1.0.1')).toBe(-1)
  })
  test('should return 0 if versions are equal', () => {
    expect(versionCompare('1.0.0', '1.0.0')).toBe(0)
    expect(versionCompare('2.1.5', '2.1.5')).toBe(0)
    expect(versionCompare('0.0.0', '0.0.0')).toBe(0)
  })
  test('should throw an error if either version is invalid', () => {
    expect(() => versionCompare('1.0.0', '')).toThrow()
    expect(() => versionCompare('1.0.0', 'foo')).toThrow()
    // @ts-ignore
    expect(() => versionCompare(3, '1.0.0')).toThrow()
    // @ts-ignore
    expect(() => versionCompare('1.0.0', null)).toThrow()
    // @ts-ignore
    expect(() => versionCompare(undefined, '1.0.0')).toThrow()
  })
})
