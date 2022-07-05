import {isEmptyObject, stringifyIfObject} from './object'

describe('isEmptyObject', () => {
  test('true for empty object', () => {
    expect(isEmptyObject({})).toBe(true)
  })
  test('false for non-empty object', () => {
    expect(isEmptyObject({a: 1})).toBe(false)
  })
})

describe('stringifyIfObject', () => {
  test('pass through non-object inputs', () => {
    expect(stringifyIfObject('foo')).toBe('foo')
    expect(stringifyIfObject(1)).toBe(1)
    expect(stringifyIfObject(false)).toBe(false)
    expect(stringifyIfObject(undefined)).toBe(undefined)
    const func = () => null
    expect(stringifyIfObject(func)).toStrictEqual(func)
  })
  test('pass through null', () => {
    expect(stringifyIfObject(null)).toBe(null)
  })
  test('stringify arrays', () => {
    expect(stringifyIfObject(['foo'])).toBe('["foo"]')
  })
  test('stringify non-array objects', () => {
    expect(stringifyIfObject({foo: 'bar'})).toBe('{"foo":"bar"}')
  })
})
