import {addIdFromParamsToCustomDimensions} from './addIdFromParamsToCustomDimensions'
import {
  CustomDimensions,
  PiwikDimension,
  PiwikSessionDimension,
} from '@/processes/piwik/types'

describe('addIdFromParamsToCustomDimensions', () => {
  it('should not modify custom dimensions if params.id is not present', () => {
    const customDimensions: CustomDimensions = {
      [PiwikSessionDimension.userType]: 'civilian',
    }
    const result = addIdFromParamsToCustomDimensions(customDimensions, {})

    expect(result).toEqual(customDimensions)
  })

  it('should not modify custom dimensions if params.id is null or undefined', () => {
    const customDimensions: CustomDimensions = {
      [PiwikSessionDimension.userType]: 'civilian',
    }
    const result1 = addIdFromParamsToCustomDimensions(customDimensions, {
      id: undefined,
    })
    const result2 = addIdFromParamsToCustomDimensions(customDimensions, {
      id: null,
    })

    expect(result1).toEqual(customDimensions)
    expect(result2).toEqual(customDimensions)
  })

  it('should add contentId to custom dimensions, with string value, if params.id is present and has a value', () => {
    const customDimensions: CustomDimensions = {}
    const result = addIdFromParamsToCustomDimensions(customDimensions, {
      id: 123,
    })

    expect(result).toEqual({[PiwikDimension.contentId]: '123'})
  })

  it('should handle undefined custom dimensions input and still return custom dimensions', () => {
    const result = addIdFromParamsToCustomDimensions(undefined, {
      id: 123,
    })

    expect(result).toEqual({[PiwikDimension.contentId]: '123'})
  })

  it('0 is a valid ID and should not be handled as falsy', () => {
    const result = addIdFromParamsToCustomDimensions(undefined, {
      id: 0,
    })

    expect(result).toEqual({[PiwikDimension.contentId]: '0'})
  })

  it('should add contentId to existing custom dimensions if params.id is present and has a value', () => {
    const customDimensions: CustomDimensions = {
      [PiwikSessionDimension.userType]: 'civilian',
      [PiwikSessionDimension.userCity]: 'Amsterdam',
    }
    const result = addIdFromParamsToCustomDimensions(customDimensions, {
      id: 123,
    })

    expect(result).toEqual({
      [PiwikSessionDimension.userType]: 'civilian',
      [PiwikSessionDimension.userCity]: 'Amsterdam',
      [PiwikDimension.contentId]: '123',
    })
  })
})
