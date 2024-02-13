import {
  CommonEventOptions,
  TrackScreenOptions,
} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {AccessibilityChangeEventName} from 'react-native'
import {ModuleSlug} from '@/modules/slugs'

export type Piwik = {
  ready: boolean
  suggestedCategory: PiwikCategory
  trackCustomEvent: (
    name: string,
    action: PiwikAction,
    dimensions?: CustomDimensions,
    category?: PiwikCategory,
    value?: number,
  ) => void
  trackOutlink: (
    url: string,
    options?: ReplaceCustomDimensions<CommonEventOptions>,
  ) => void
  trackScreen: (
    path?: ScreenOutsideNavigationName,
    options?: ReplaceCustomDimensions<TrackScreenOptions>,
  ) => void
  trackSearch: (
    keyword: string,
    options?: ReplaceCustomDimensions<TrackScreenOptions>,
  ) => void
}

/**
 * Custom dimensions; these should be configured in the Piwik system.
 */
export enum PiwikDimension {
  /** Zoekterm gebruikt in zoekmachine */
  searchTerm = 3,
  /** Aantal zoekresultaten */
  searchResultAmount = 4,
  /** Soort zoekopdracht */
  searchType = 5,
  /** Title van het aangeklikte zoekresultaat */
  searchResultTitle = 6,
  /** URL van het aangeklikte zoekresultaat */
  searchResultUrl = 7,
  /** Soort van het aangeklikte zoekresultaat */
  searchResultType = 8,
  /** Het hoeveelste zoekresultaat is aangeklikt (telt van boven) */
  searchResultSelected = 9,
  /** Titel van het content bericht */
  contentTitle = 10,
  /** Onderwerp/Onderwerpen van het content bericht */
  contentSubject = 11,
  /** Team dat het content bericht heeft geschreven */
  contentTeam = 12,
  /** Laatste publicatiedatum van het content bericht */
  contentPublicationDate = 13,
  /** Type van de content (artikel/nieuws) */
  contentType = 14,
  /** Gebruikers filter op intern of extern */
  userIntext = 15,
  /** Zoekmachine soort */
  searchMachine = 16,
  /** Pagina type o.b.v. Amsterdam Content Meetmodel */
  pageType = 17,
  /** The ID related to the content e.g. a project ID */
  contentId = 20,
}

/**
 * Custom session dimensions; these should be configured in the Piwik system.
 */
export enum PiwikSessionDimension {
  /** Gebruikerstype (al gebruikt door mijn.amsterdam als ProfileType) */
  userType = 1,
  /** Gebruikersstad (al gebruikt door mijn.amsterdam als City) */
  userCity = 2,
  appVersion = 18,
  appVersionWithBuild = 19,
  reduceMotionEnabled = 21,
  locationPermission = 22,
  screenReaderEnabled = 23,
  accessibilityServiceEnabled = 24,
  boldTextEnabled = 25,
  grayscaleEnabled = 26,
  invertColorsEnabled = 27,
  reduceTransparencyEnabled = 28,
  fontScale = 29,
  isLandscape = 30,
  isPortrait = 31,
  isTablet = 32,
  hasCameraPermission = 33,
  hasPhotosPermission = 34,
  hasLocationPermission = 35,
  hasNotificationPermission = 36,
}

export type CustomDimensions = Partial<
  Record<PiwikDimension | PiwikSessionDimension, string>
>

export type ReplaceCustomDimensions<T> = Omit<T, 'customDimensions'> & {
  customDimensions?: CustomDimensions
}

/** Log categories, we use this to distinguish between modules. Non-module related data should be logged in the "general" category. */
export type PiwikCategory = ModuleSlug | 'general'

/** The actions that can trigger a log. */
export enum PiwikAction {
  accessibilityEventListener = 'accessibilityEventListener',
  addressAdd = 'addressAdd',
  addressChange = 'addressChange',
  buttonPress = 'buttonPress',
  startUp = 'startUp',
  toForeground = 'toForeground',
}

/** We generally use the route name as the name of the screen when we log a screen view. This is not possible for screens outside the navigation tree, for those we use these names. */
export enum ScreenOutsideNavigationName {
  errorWithRestart = 'errorWithRestart',
  updateScreen = 'updateScreen',
}

export enum PiwikError {
  alreadyInitialized = 'Piwik Pro SDK has been already initialized',
  missingEnvVars = 'PIWIK_PRO_URL or PIWIK_PRO_ID are not defined in env',
}

export type LogProps = {
  logAction: PiwikAction
  logCategory?: PiwikCategory
  logDimensions?: CustomDimensions
  logName?: string
  logValue?: number
}

export type AccessibilityFeatureLogConfig = {
  dimension: PiwikSessionDimension
  eventName: AccessibilityChangeEventName
  getIsEnabled: () => Promise<boolean>
}
