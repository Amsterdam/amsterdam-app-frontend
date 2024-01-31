import {
  CommonEventOptions,
  TrackCustomEventOptions,
  TrackScreenOptions,
} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {ModuleSlug} from '@/modules/slugs'

export type Piwik = {
  trackCustomEvent: (
    category: PiwikCategory,
    action: PiwikAction,
    options?: TrackCustomEventOptions,
  ) => void
  trackOutlink: (url: string, options?: CommonEventOptions) => void
  trackScreen: (
    path?: ScreenOutsideNavigationName,
    options?: TrackScreenOptions,
  ) => void
  trackSearch: (keyword: string, options?: TrackScreenOptions) => void
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
}

/** Log categories, we use this to distinguish between modules. Non-module related data should be logged in the "general" category. */
export type PiwikCategory = ModuleSlug | 'general'

/** The actions that can trigger a log. */
export enum PiwikAction {
  addressAdd = 'addressAdd',
  addressChange = 'addressChange',
  buttonPress = 'buttonPress',
  toForeground = 'toForeground',
}

/** The actions that can trigger a log. */
export enum ScreenOutsideNavigationName {
  errorWithRestart = 'errorWithRestart',
  updateScreen = 'updateScreen',
}
