import {accessibleText} from './accessibleText'

test(`empty string`, () => expect('').toBe(''))

//@ts-ignore
test(`value is 'null'`, () => expect(accessibleText(null)).toBe(''))

test(`value is 'undefined'`, () => expect(accessibleText(undefined)).toBe(''))

test(`'undefined' in 2 string parmeter`, () =>
  expect(accessibleText('text', undefined)).toBe('text'))

test(`'null' in 2 string parmeter`, () =>
  //@ts-ignore
  expect(accessibleText('text', null)).toBe('text'))
