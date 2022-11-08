import {injectCommas} from './injectCommas'

test('kommas tussen stukken tekst', () =>
  expect(injectCommas('a', 'b')).toBe('a, b'))

test('undefined', () => expect(injectCommas(undefined)).toBe(''))

// @ts-ignore
test('null', () => expect(injectCommas(null)).toBe(''))

test('empty string', () => expect(injectCommas('')).toBe(''))
