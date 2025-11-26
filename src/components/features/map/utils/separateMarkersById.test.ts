import {separateMarkersById} from '@/components/features/map/utils/separateMarkersById'

const MARKERS = [{id: '123'}, {id: '234'}, {id: '345'}, {id: '456'}]
const MARKERS2 = [{id: 123}, {id: 234}, {id: '345'}, {id: '456'}]

describe('separateMarkersById', () => {
  it('should exclude a marker based on a single string id, and return all other markers as included.', () => {
    const filter = '345'

    expect(separateMarkersById(filter, MARKERS)).toEqual({
      included: [{id: '123'}, {id: '234'}, {id: '456'}],
      excluded: [{id: '345'}],
    })
  })

  it('should exclude markers based on an array of string ids, and return all other markers as included.', () => {
    const filter = ['123', '234']

    expect(separateMarkersById(filter, MARKERS)).toEqual({
      included: [{id: '345'}, {id: '456'}],
      excluded: [{id: '123'}, {id: '234'}],
    })
  })

  it('should exclude one marker based on an array of a single string id, and return all other markers as included.', () => {
    const filter = ['123']

    expect(separateMarkersById(filter, MARKERS)).toEqual({
      included: [{id: '234'}, {id: '345'}, {id: '456'}],
      excluded: [{id: '123'}],
    })
  })

  it('should exclude a markers for number and string ids.', () => {
    const filter = [123, '456']

    expect(separateMarkersById(filter, MARKERS2)).toEqual({
      included: [{id: 234}, {id: '345'}],
      excluded: [{id: 123}, {id: '456'}],
    })
  })
})
