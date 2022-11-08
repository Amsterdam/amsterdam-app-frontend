import {isEmptyObject} from './object'

describe('isEmptyObject', () => {
  test('true for empty object', () => {
    expect(isEmptyObject({})).toBe(true)
  })
  test('false for non-empty object', () => {
    expect(isEmptyObject({a: 1})).toBe(false)
  })
})
