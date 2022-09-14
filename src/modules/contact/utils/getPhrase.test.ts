import {getQueuedPhrase, getWaitingTimePhrase, replaceZero} from './getPhrase'

describe('replaceZero', () => {
  test('0', () => {
    expect(replaceZero(0)).toBe('geen')
  })
  test('1', () => {
    expect(replaceZero(1)).toBe('1')
  })
})

describe('getQueuedPhrase', () => {
  test('0', () => {
    expect(getQueuedPhrase(0)).toBe('Er zijn nu geen wachtenden')
  })
  test('1', () => {
    expect(getQueuedPhrase(1)).toBe('Er is nu 1 wachtende')
  })
  test('meer', () => {
    expect(getQueuedPhrase(2)).toBe('Er zijn nu 2 wachtenden')
  })
})

describe('getWaitingTimePhrase', () => {
  test('0', () => {
    expect(getWaitingTimePhrase(0)).toBe('De wachttijd is 0 minuten')
  })
  test('1', () => {
    expect(getWaitingTimePhrase(1)).toBe('De wachttijd is 1 minuut')
  })
  test('59', () => {
    expect(getWaitingTimePhrase(59)).toBe('De wachttijd is 59 minuten')
  })
  test('60', () => {
    expect(getWaitingTimePhrase(60)).toBe('De wachttijd is meer dan een uur')
  })
})
