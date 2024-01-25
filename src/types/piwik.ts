import {
  TrackCustomEventOptions,
  TrackScreenOptions,
} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {RootStackParams} from '@/app/navigation/types'
import {ModuleSlug} from '@/modules/slugs'

export type Piwik = {
  trackCustomEvent: (
    category: PiwikCategory,
    action: string,
    options?: TrackCustomEventOptions,
  ) => void
  trackScreen: (
    path: keyof RootStackParams,
    options?: TrackScreenOptions | undefined,
  ) => void
}

/**
 * Custom dimsensions; these should be configured in the Piwik system.
 */
export enum PiwikDimensions {
  // 1-17 are standard metrics, see Aansluitgids Technisch Generiek Meetplan 1.1 (20-03-2023)

  /** Gebruikerstype (al gebruikt door mijn.amsterdam als ProfileType) */
  userType = 1,
  /** Gebruikersstad (al gebruikt door mijn.amsterdam als City) */
  userCity = 2,
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

  // 20+ are metrics specifically for the app:

  /** Screentitle from navigation parameters */
  screenTitle = 20,
  /** Session: is reduced motion enabled */
  reduceMotionEnabled = 21,
  /** Session: is reduced motion enabled */
  locationPermission = 22,
  /** Session: is reduced motion enabled */
  screenReaderEnabled = 23,
}

/** Log categories, we use this to distinguish between modules. Non-module related data should be logged in the "general" category. */
export enum PiwikCategory {
  about = ModuleSlug.about,
  address = ModuleSlug.address,
  constructionWork = ModuleSlug['construction-work'],
  constructionWorkEditor = ModuleSlug['construction-work-editor'],
  contact = ModuleSlug.contact,
  general = 'general',
  home = ModuleSlug.home,
  onboarding = ModuleSlug.onboarding,
  openWasteContainer = ModuleSlug['open-waste-container'],
  redirects = ModuleSlug.redirects,
  reportProblem = ModuleSlug['report-problem'],
  user = ModuleSlug.user,
  wasteGuide = ModuleSlug['waste-guide'],
}

/** The actions that can trigger a log. */
export enum PiwikAction {
  addressAdd = 'addressAdd',
  addressChange = 'addressChange',
  buttonPress = 'buttonPress',
  linkPress = 'linkPress',
  toForeground = 'toForeground',
}
