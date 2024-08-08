import {PiwikDimension, PiwikSessionDimension} from '@/processes/piwik/types'
import {getCustomDimensions} from '@/processes/piwik/utils/getCustomDimensions'
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

  it('should keep any dimensions already defined appInsights', () => {
    const customDimensions = {
      [PiwikDimension.pageType]: 'foo',
    }

    const result = getCustomDimensions(customDimensions, true)

    expect(result).toEqual({
      pageType: 'foo',
      appVersion: VERSION_NUMBER,
      appVersionWithBuild: VERSION_NUMBER_WITH_BUILD,
    })
  })

  it('should handle undefined dimensions appInsights', () => {
    const result = getCustomDimensions(undefined, true)

    expect(result).toEqual({
      appVersion: VERSION_NUMBER,
      appVersionWithBuild: VERSION_NUMBER_WITH_BUILD,
    })
  })

  it('should filter out undefined values appInsights', () => {
    const customDimensions = {
      [PiwikDimension.pageType]: undefined,
    }

    const result = getCustomDimensions(customDimensions, true)

    expect(result).toEqual({
      appVersion: VERSION_NUMBER,
      appVersionWithBuild: VERSION_NUMBER_WITH_BUILD,
    })
  })
})
