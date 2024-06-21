import {getCustomDimensions} from './getCustomDimensions'
import {PiwikDimension, PiwikSessionDimension} from '@/processes/piwik/types'
import {VERSION_NUMBER} from '@/utils/version'

describe('postProcessDimensions', () => {
  const VERSION_NUMBER_WITH_BUILD = `${VERSION_NUMBER}.unknown`

  it('should keep any dimensions already defined', () => {
    const customDimensions = {
      [PiwikDimension.pageType]: 'foo',
    }

    const result = getCustomDimensions(customDimensions)

    expect(result).toEqual({
      [PiwikDimension.pageType]: 'foo',
      [PiwikSessionDimension.appVersion]: VERSION_NUMBER,
      [PiwikSessionDimension.appVersionWithBuild]: VERSION_NUMBER_WITH_BUILD,
    })
  })

  it('should handle undefined dimensions', () => {
    const result = getCustomDimensions()

    expect(result).toEqual({
      [PiwikSessionDimension.appVersion]: VERSION_NUMBER,
      [PiwikSessionDimension.appVersionWithBuild]: VERSION_NUMBER_WITH_BUILD,
    })
  })

  it('should filter out undefined values', () => {
    const customDimensions = {
      [PiwikDimension.pageType]: undefined,
    }

    const result = getCustomDimensions(customDimensions)

    expect(result).toEqual({
      [PiwikSessionDimension.appVersion]: VERSION_NUMBER,
      [PiwikSessionDimension.appVersionWithBuild]: VERSION_NUMBER_WITH_BUILD,
    })
  })
})
