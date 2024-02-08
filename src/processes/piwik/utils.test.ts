import {
  CommonEventOptions,
  TrackScreenOptions,
} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {
  addIdFromParamsToCustomDimensions,
  getOptionsWithDefaultDimensions,
} from './utils'
import {
  CustomDimensions,
  PiwikDimension,
  PiwikSessionDimension,
} from '@/processes/piwik/types'
import {VERSION_NUMBER} from '@/utils/version'

describe('getOptionsWithDefaultDimensions', () => {
  const VERSION_NUMBER_WITH_BUILD = `${VERSION_NUMBER}.unknown`

  it('should keep any dimensions already defined', () => {
    const options: CommonEventOptions = {
      customDimensions: {
        [PiwikDimension.pageType]: 'foo',
      },
    }

    const result = getOptionsWithDefaultDimensions(options)

    expect(result).toEqual({
      customDimensions: {
        [PiwikDimension.pageType]: 'foo',
        [PiwikSessionDimension.appVersion]: VERSION_NUMBER,
        [PiwikSessionDimension.appVersionWithBuild]: VERSION_NUMBER_WITH_BUILD,
      },
    })
  })

  it('should handle undefined options', () => {
    const result = getOptionsWithDefaultDimensions()

    expect(result).toEqual({
      customDimensions: {
        [PiwikSessionDimension.appVersion]: VERSION_NUMBER,
        [PiwikSessionDimension.appVersionWithBuild]: VERSION_NUMBER_WITH_BUILD,
      },
    })
  })

  it('should pass through additional options', () => {
    const options: TrackScreenOptions = {
      title: 'foo',
      customDimensions: {
        [PiwikDimension.pageType]: 'bar',
      },
    }

    const result = getOptionsWithDefaultDimensions(options)

    expect(result).toEqual({
      title: 'foo',
      customDimensions: {
        [PiwikDimension.pageType]: 'bar',
        [PiwikSessionDimension.appVersion]: VERSION_NUMBER,
        [PiwikSessionDimension.appVersionWithBuild]: VERSION_NUMBER_WITH_BUILD,
      },
    })
  })
})

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
