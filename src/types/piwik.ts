/**
 * Custom dimsensions volgens Aansluitgids Technisch Generiek Meetplan 1.1 (20-03-2023)
 */
export enum PiwikDimensions {
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
}
