import {formatDateTime} from '@/utils/datetime/formatDateTime'

describe('formatDateTime', () => {
  test('Test datum', () => {
    expect(formatDateTime('December 17, 1995 03:24:00')).toBe(
      '17 december 1995 03.24:00',
    )
  })

  test('ISO date year/month/day', () => {
    expect(formatDateTime('2023-03-01')).toBe('1 maart 2023 00.00:00')
  })

  test('ISO date year/month', () => {
    expect(formatDateTime('2021-01')).toBe('1 januari 2021 00.00:00')
  })

  test('ISO date year', () => {
    expect(formatDateTime('2021')).toBe('1 januari 2021 00.00:00')
  })

  test('ISO date UTC', () => {
    expect(formatDateTime('2021-01-01T12:00:00Z')).toBe(
      '1 januari 2021 11.00:00',
    )
  })

  test('ISO date GMT+2', () => {
    expect(formatDateTime('2021-01-01T12:00:00+02:00')).toBe(
      '1 januari 2021 09.00:00',
    )
  })

  test('Date format with slashes', () => {
    expect(formatDateTime('01/01/2021')).toBe('1 januari 2021 00.00:00')
  })

  test('Date format MMM DD YYYY', () => {
    expect(formatDateTime('Jan 01 2021')).toBe('1 januari 2021 00.00:00')
  })

  test(`value of 'null'`, () => {
    //@ts-ignore
    expect(formatDateTime(null)).toBe('')
  })

  test(`value of 'undefined'`, () => {
    //@ts-ignore
    expect(formatDateTime(undefined)).toBe('')
  })
})
