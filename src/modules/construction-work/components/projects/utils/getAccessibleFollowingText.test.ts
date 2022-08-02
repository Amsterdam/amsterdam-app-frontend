import {getAccessibleFollowingText} from './getAccessibleFollowingText'

describe('getAccessibleFollowingText', () => {
  it('handles a followed project with recent articles', () => {
    expect(getAccessibleFollowingText(true, 7)).toBe('7 berichten')
  })
  it('handles a followed project without recent articles', () => {
    expect(getAccessibleFollowingText(true, undefined)).toBe('Volgend')
  })
  it('handles a followed project with zero recent articles', () => {
    expect(getAccessibleFollowingText(true, 0)).toBe('Volgend')
  })
  it('handles a non-followed project with recent articles (which should not occur)', () => {
    expect(getAccessibleFollowingText(false, 7)).toBe(undefined)
  })
  it('handles a non-followed project without recent articles', () => {
    expect(getAccessibleFollowingText(false, undefined)).toBe(undefined)
  })
  it('handles a non-followed project with zero recent articles', () => {
    expect(getAccessibleFollowingText(false, 0)).toBe(undefined)
  })
})
