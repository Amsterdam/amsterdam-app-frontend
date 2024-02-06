import {
  CommonEventOptions,
  TrackScreenOptions,
} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {PiwikDimension, PiwikSessionDimension} from '@/types/piwik'
import {getOptionsWithDefaultDimensions} from '@/utils/piwik'

describe('getOptionsWithDefaultDimensions', () => {
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
        [PiwikSessionDimension.appVersion]: 'unknown',
        [PiwikSessionDimension.appVersionWithBuild]: 'unknown.unknown',
      },
    })
  })

  it('should handle undefined options', () => {
    const result = getOptionsWithDefaultDimensions()

    expect(result).toEqual({
      customDimensions: {
        [PiwikSessionDimension.appVersion]: 'unknown',
        [PiwikSessionDimension.appVersionWithBuild]: 'unknown.unknown',
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
        [PiwikSessionDimension.appVersion]: 'unknown',
        [PiwikSessionDimension.appVersionWithBuild]: 'unknown.unknown',
      },
    })
  })
})
