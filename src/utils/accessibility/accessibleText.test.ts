import {accessibleText} from './accessibleText'

test(`empty string`, () => expect(accessibleText('')).toBe(''))

//@ts-ignore
test(`value is 'null'`, () => expect(accessibleText(null)).toBe(''))

test(`value is 'undefined'`, () => expect(accessibleText(undefined)).toBe(''))

test(`'undefined' in 2 string parameter`, () =>
  expect(accessibleText('text', undefined)).toBe('text'))

test(`'null' in 2 string parameter`, () =>
  //@ts-ignore
  expect(accessibleText('text', null)).toBe('text'))

test(`abbreviation and inject comma's`, () =>
  expect(accessibleText('het is van 5 t/m 7 oktober', 'in de ochtend')).toBe(
    'het is van 5 tot en met 7 oktober, in de ochtend',
  ))
