import {IApplicationInsights} from '@microsoft/applicationinsights-web'
import type {PiwikProSdkType} from '@piwikpro/react-native-piwik-pro-sdk'
import {RootStackParams} from '@/app/navigation/types'
import {devError} from '@/processes/development'
import {Params} from '@/processes/logging/hooks/useTrackEvents'
import {PiwikCategory, Piwik, PiwikDimension} from '@/processes/piwik/types'
import {addIdFromParamsToDimensions} from '@/processes/piwik/utils/addIdFromParamsToDimensions'
import {getCustomDimensions} from '@/processes/piwik/utils/getCustomDimensions'
import {getTitleFromParams} from '@/processes/piwik/utils/getTitleFromParams'
import {SendErrorLog, SentryErrorLogKey} from '@/processes/sentry/types'
import {sanitizeUrl} from '@/utils/sanitizeUrl'

const piwikDevError = () => devError('piwik not initialized')

const FILENAME = 'useTrackEvents.ts'

export const getTrackEvents = (
  sendSentryErrorLog: SendErrorLog,
  suggestedCategory: PiwikCategory,
  appInsights: IApplicationInsights,
  piwikInstance?: PiwikProSdkType | null,
  routeName?: keyof RootStackParams,
  params?: Params,
): Piwik => ({
  ready: !!piwikInstance,
  trackCustomEvent: (
    name,
    action,
    dimensions,
    category = suggestedCategory,
    value = undefined,
  ) => {
    piwikInstance
      ? piwikInstance
          .trackCustomEvent(category, action, {
            path: routeName,
            customDimensions: getCustomDimensions(dimensions),
            value,
          })
          .catch(() => {
            sendSentryErrorLog(
              SentryErrorLogKey.piwikTrackCustomEvent,
              FILENAME,
              {
                category,
                action,
                name,
                path: routeName,
                value,
              },
            )
          })
      : piwikDevError()
  },
  trackOutlink: (rawUrl, options) => {
    const url = sanitizeUrl(rawUrl)

    piwikInstance
      ? piwikInstance
          .trackOutlink(url, {
            ...options,
            customDimensions: getCustomDimensions({
              ...options?.customDimensions,
              [PiwikDimension.routeName]: routeName,
            }),
          })
          .catch(() => {
            sendSentryErrorLog(SentryErrorLogKey.piwikTrackOutlink, FILENAME, {
              url,
            })
          })
      : piwikDevError()
  },
  trackScreen: (path, options) => {
    const name = path ?? routeName

    if (!name) {
      return
    }

    const customDimensions = addIdFromParamsToDimensions(
      options?.customDimensions,
      params,
    )

    piwikInstance
      ? piwikInstance
          .trackScreen(name, {
            ...options,
            title: getTitleFromParams(params),
            customDimensions: getCustomDimensions(customDimensions),
          })
          .catch(() => {
            sendSentryErrorLog(SentryErrorLogKey.piwikTrackScreen, FILENAME, {
              path,
            })
          })
      : piwikDevError()

    appInsights.trackPageView(
      {name},
      getCustomDimensions(customDimensions, true),
    )
  },
  trackSearch: (keyword, options) => {
    piwikInstance
      ? piwikInstance
          .trackSearch(keyword, {
            ...options,
            customDimensions: getCustomDimensions(options?.customDimensions),
          })
          .catch(() => {
            sendSentryErrorLog(SentryErrorLogKey.piwikTrackSearch, FILENAME)
          })
      : piwikDevError()
  },
})
