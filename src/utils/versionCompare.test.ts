import {CompareResults, versionCompare} from '@/utils/versionCompare'

describe('versionCompare', () => {
  test('versionCompare', () => {
    expect(versionCompare('2.1.0', '2.0.0')).toBe(CompareResults.higher)
    expect(versionCompare('2.1.0', '2.2.0')).toBe(CompareResults.lower)
    expect(versionCompare('3.1.0', '2.2.0')).toBe(CompareResults.higher)
    expect(versionCompare('2.1.0', '3.0.0')).toBe(CompareResults.lower)
    expect(versionCompare('2.0.5', '2.1.0')).toBe(CompareResults.lower)
    expect(versionCompare('2.1', '2.0.0')).toBe(CompareResults.higher)
    expect(versionCompare('2.1.0', '2.0')).toBe(CompareResults.higher)
    expect(versionCompare('2.1.0', '2')).toBe(CompareResults.higher)
    expect(versionCompare('2.1.0', '3')).toBe(CompareResults.lower)
    expect(versionCompare('2.1.0', '2.1.0')).toBe(CompareResults.equal)
    expect(versionCompare('2.1.0', '2.1')).toBe(CompareResults.equal)
    expect(versionCompare('2', '2.0.0')).toBe(CompareResults.equal)
  })
})
