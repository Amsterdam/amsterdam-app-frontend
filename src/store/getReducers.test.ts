import {getConfigs, shouldTransform} from './getReducers'
import {ModuleClientConfig} from '@/modules/types'

describe('getConfigs', () => {
  test('should reduce an array of module configs to an array of Redux configs', () => {
    expect(
      getConfigs([
        {
          reduxConfigs: [{key: 'A', value: 1}],
        },
        {
          reduxConfigs: [
            {key: 'B', value: 2},
            {key: 'C', value: 3},
          ],
        },
        {},
      ] as ModuleClientConfig[]),
    ).toEqual([
      {key: 'A', value: 1},
      {key: 'B', value: 2},
      {key: 'C', value: 3},
    ])
  })
  test('should return an empty array if no Redux configs exist', () => {
    expect(getConfigs([{}, {}] as ModuleClientConfig[])).toEqual([])
  })
})

describe('shouldTransform', () => {
  test('should return false when oldAppVersion is not provided', () => {
    expect(shouldTransform('1.0.0')).toBe(false)
  })
  test('should execute the appVersion function and return its result', () => {
    expect(shouldTransform(oldVersion => oldVersion === '1', '1')).toBe(true)
    expect(shouldTransform(oldVersion => oldVersion === '1', '2')).toBe(false)
  })
  test('should compare versions and return the result', () => {
    expect(shouldTransform('2', '1')).toBe(true)
    expect(shouldTransform('1', '2')).toBe(false)
  })
  test('should return false on error during version comparison', () => {
    expect(shouldTransform('STROOPWAFELS!', '1')).toBe(false)
    // @ts-ignore
    expect(shouldTransform(undefined, '1')).toBe(false)
  })
})
