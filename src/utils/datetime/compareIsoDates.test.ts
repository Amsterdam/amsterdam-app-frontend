import {compareIsoDates} from './compareIsoDates'

test('equal dates', () =>
  expect(
    compareIsoDates('1970-01-01T00:00:00+0000', '1970-01-01T00:00:00+0000'),
  ).toBe(0))

test('handle timezones', () =>
  expect(
    compareIsoDates('1970-01-01T00:00:00+0000', '1970-01-01T01:00:00+0100'),
  ).toBe(0))

test('date 1 is before date 2', () =>
  expect(
    compareIsoDates('1970-01-01T00:00:00+0000', '1970-01-01T00:00:01+0000'),
  ).toBe(-1))

test('date 1 is after date 2', () =>
  expect(
    compareIsoDates('1970-01-01T00:00:01+0000', '1970-01-01T00:00:00+0000'),
  ).toBe(1))

test('date 1 is before now', () =>
  expect(compareIsoDates('1970-01-01T00:00:00+0000')).toBe(-1))

test('date 1 is after now', () =>
  expect(compareIsoDates('2222-01-01T00:00:00+0000')).toBe(1))

test('application: check if "now" is between 2 dates', () =>
  expect(
    compareIsoDates('1970-01-01T00:00:00+0000') < 0 &&
      compareIsoDates('2222-01-01T00:00:00+0000') > 0,
  ).toBe(true))
