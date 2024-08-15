import {CustomDimensions, PiwikDimension} from '@/processes/piwik/types'
import {createCustomDimensionsFromRouteParams} from '@/processes/piwik/utils/createCustomDimensionsFromRouteParams'
import {getCustomDimensions} from '@/processes/piwik/utils/getCustomDimensions'

describe('createCustomDimensionsFromRouteParams', () => {
  it('should return default dimension when there is no id', () => {
    const routeParams: Record<string, unknown> = {}
    const customDimensions: CustomDimensions | undefined = getCustomDimensions(
      {},
    )
    const result = createCustomDimensionsFromRouteParams(routeParams)

    expect(result.piwik).toEqual(customDimensions)
  })
  it('should return default dimension when routeParams.id is null', () => {
    const routeParams: Record<string, unknown> = {
      id: undefined,
    }
    const customDimensions: CustomDimensions | undefined = getCustomDimensions(
      {},
    )
    const result = createCustomDimensionsFromRouteParams(routeParams)

    expect(result.piwik).toEqual(customDimensions)
  })
  it('should return default dimension when routeParams.id is undefined', () => {
    const routeParams: Record<string, unknown> = {
      id: null,
    }
    const customDimensions: CustomDimensions | undefined = getCustomDimensions(
      {},
    )
    const result = createCustomDimensionsFromRouteParams(routeParams)

    expect(result.piwik).toEqual(customDimensions)
  })
  it('should add contentId to custom dimensions, with string value, if params.id is present and has a value', () => {
    const routeParams: Record<string, unknown> = {
      id: 123,
    }
    const customDimensions: CustomDimensions | undefined = getCustomDimensions({
      [PiwikDimension.contentId]: '123',
    })

    const result = createCustomDimensionsFromRouteParams(routeParams)

    expect(result.piwik).toEqual(customDimensions)
  })

  it('0 is a valid ID and should not be handled as falsy', () => {
    const routeParams: Record<string, unknown> = {
      id: 0,
    }
    const customDimensions: CustomDimensions | undefined = getCustomDimensions({
      [PiwikDimension.contentId]: '0',
    })

    const result = createCustomDimensionsFromRouteParams(routeParams)

    expect(result.piwik).toEqual(customDimensions)
  })

  it('should add isPushNotificationDeeplink to custom dimensions, if params.isPushNotificationDeeplink is present and has a value', () => {
    const routeParams: Record<string, unknown> = {
      isPushNotificationDeeplink: 'true',
    }
    const customDimensions: CustomDimensions | undefined = getCustomDimensions({
      [PiwikDimension.isPushNotificationDeeplink]: 'true',
    })

    const result = createCustomDimensionsFromRouteParams(routeParams)

    expect(result.piwik).toEqual(customDimensions)
  })
  it('should add isPushNotificationDeeplink and id when both present', () => {
    const routeParams: Record<string, unknown> = {
      id: 123,
      isPushNotificationDeeplink: 'true',
    }
    const customDimensions: CustomDimensions | undefined = getCustomDimensions({
      [PiwikDimension.contentId]: '123',
      [PiwikDimension.isPushNotificationDeeplink]: 'true',
    })

    const result = createCustomDimensionsFromRouteParams(routeParams)

    expect(result.piwik).toEqual(customDimensions)
  })
})
