import {shallowEqual} from './shallowEqual'

test('Full equal objects', () =>
  expect(shallowEqual({a: 1}, {a: 1})).toBe(true))

test('Not equal values', () => expect(shallowEqual({a: 1}, {a: 2})).toBe(false))

test('Not equal keys', () => expect(shallowEqual({a: 1}, {b: 1})).toBe(false))

test('undefined parameter', () =>
  // @ts-ignore
  expect(shallowEqual(undefined, {a: 1})).toBe(false))

test('null parameter', () =>
  // @ts-ignore
  expect(shallowEqual(null, {a: 1})).toBe(false))

test('string parameter', () =>
  // @ts-ignore
  expect(shallowEqual('a', 'a')).toBe(false))
