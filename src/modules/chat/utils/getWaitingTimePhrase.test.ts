import {getWaitingTimePhrase} from '@/modules/chat/utils/getWaitingTimePhrase'

describe('getWaitingTimePhrase', () => {
  it('should return "minder dan een minuut" for waiting time less than or equal to 60 seconds', () => {
    expect(getWaitingTimePhrase(30)).toBe('minder dan een minuut')
    expect(getWaitingTimePhrase(60)).toBe('minder dan een minuut')
  })

  it('should return the correct number of minutes for waiting time greater than 60 seconds', () => {
    expect(getWaitingTimePhrase(61)).toBe('2 minuten')
    expect(getWaitingTimePhrase(120)).toBe('2 minuten')
    expect(getWaitingTimePhrase(121)).toBe('3 minuten')
  })
})
