import {formatDate} from './formatDate'

test('Test datum', () =>
  expect(formatDate('December 17, 1995 03:24:00')).toBe('17 december 1995'))

test('ISO date year/month/day', () =>
  expect(formatDate('2021-01-01')).toBe('1 januari 2021'))

test('ISO date year/month', () =>
  expect(formatDate('2021-01')).toBe('1 januari 2021'))

test('ISO date year', () => expect(formatDate('2021')).toBe('1 januari 2021'))

test('ISO date UTC', () =>
  expect(formatDate('2021-01-01T12:00:00Z')).toBe('1 januari 2021'))

test('ISO date GMT+2', () =>
  expect(formatDate('2021-01-01T12:00:00+02:00')).toBe('1 januari 2021'))

test('Date format with slashes', () =>
  expect(formatDate('01/01/2021')).toBe('1 januari 2021'))

test('Date format MMM DD YYYY', () =>
  expect(formatDate('Jan 01 2021')).toBe('1 januari 2021'))

test(`value of 'null'`, () =>
  //@ts-ignore
  expect(formatDate(null)).toBe(''))

test(`value of 'undefined'`, () =>
  //@ts-ignore
  expect(formatDate(undefined)).toBe(''))
