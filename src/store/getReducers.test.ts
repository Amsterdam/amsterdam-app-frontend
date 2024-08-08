import {ModuleClientConfig} from '@/modules/types'
import {getReduxConfigs} from '@/store/getReducers'

describe('getReduxConfigs', () => {
  test('should reduce an array of module configs to an array of Redux configs', () => {
    expect(
      getReduxConfigs([
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
    expect(getReduxConfigs([{}, {}] as ModuleClientConfig[])).toEqual([])
  })
})
