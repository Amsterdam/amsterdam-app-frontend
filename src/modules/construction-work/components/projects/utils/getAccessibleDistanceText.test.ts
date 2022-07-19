import {getAccessibleDistanceText} from './getAccessibleDistanceText'

describe('getAccessibleDistanceText', () => {
  it('handles two normal values', () => {
    expect(getAccessibleDistanceText(999, 111)).toBe(
      '999 meter of 111 stappen vanaf uw adres',
    )
  })
  it('handles meters only', () => {
    expect(getAccessibleDistanceText(999, undefined)).toBe(
      '999 meter vanaf uw adres',
    )
  })
  it('handles strides only', () => {
    expect(getAccessibleDistanceText(undefined, 999)).toBe(
      '999 stappen vanaf uw adres',
    )
  })
  it('return nothing if both params undefined', () => {
    expect(getAccessibleDistanceText(undefined, undefined)).toBe(undefined)
  })
  it('handles all zero values', () => {
    expect(getAccessibleDistanceText(0, 0)).toBe(
      '0 meter of 0 stappen vanaf uw adres',
    )
  })
})
