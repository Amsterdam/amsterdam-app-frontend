import {SectionProps} from './Section'

type Chapter = {
  title: string
  content: SectionProps[]
}
export const chapters: Chapter[] = [
  {
    title: 'Terugblikken',
    content: [
      {
        title: 'Afval',
        image: {
          file: require('../../../assets/images/best-wishes-21/afval.png'),
          aspectRatio: 344 / 165,
        },
        body: [
          'Met de app kan de Amsterdammer laagdrempelig informatie vinden over afval in diens buurt. Zoals wanneer het grof afval wordt opgehaald en welke container dichtbij is, en problemen melden.',
        ],
      },
      {
        image: {
          file: require('../../../assets/images/best-wishes-21/bouwprojecten.jpg'),
          aspectRatio: 1035 / 579,
        },
        title: 'Bouw- en verkeersprojecten',
        body: [
          'Als Amsterdammer heeft u wel eens hinder van bouw- en verkeersprojecten bij u in de buurt. De app houdt u op de hoogte van bouwprojecten als u dat wilt. U kunt aangeven van welke bouwprojecten u berichten wilt krijgen.',
        ],
      },
      {
        image: {
          file: require('../../../assets/images/best-wishes-21/melding-doen.jpg'),
          aspectRatio: 1035 / 579,
        },
        title: 'Melding doen',
        body: [
          'Midden in het menu staat een grote blauwe knop waarmee een Amsterdammer de gemeente iets kan laten weten over de openbare ruimte.Veel mensen kennen het telefoonnummer 14 020 wel, maar weten niet dat ze ook online gemakkelijk een melding kunnen doen, van bijvoorbeeld rondzwervend vuil.',
        ],
      },
      {
        title: 'Pushberichten',
        icon: 'pushberichten',
        body: [
          'Een Amsterdammer kan als hij of zij dit wil, pushberichten ontvangen. In eerste instantie voor de bouwprojecten naar keuze. Dit kunnen we in de toekomst ook inzetten voor andere onderwerpen, zoals ‘Uw grofvuil wordt vanwege Hemelvaartsdag op vrijdag opgehaald i.p.v. donderdag.',
        ],
      },
      {
        icon: 'toegankelijkheid',
        title: 'Toegankelijkheid',
        body: [
          'Eén app voor alle Amsterdammers! Daarom voldoen we aan de nieuwe toegankelijkheidswetgeving waar apps van de overheid aan moeten voldoen. Ook ‘Taal voor Allemaal’ wordt komend jaar verder toegepast.',
        ],
      },
    ],
  },
  {
    title: 'Vooruitkijken',
    content: [
      {
        image: {
          file: require('../../../assets/images/best-wishes-21/vooruitkijken.jpg'),
          aspectRatio: 717 / 402,
        },
        body: [
          'Komend jaar gaan we verder met het ontwikkelen van de Amsterdam App. We kijken uit naar een eerste livegang voor familie, vrienden en collega’s.',
          'Hiervoor moeten we nog werk verzetten zoals een contactpagina, bugs oplossen etc, maar denk ook aan het afnemen van gebruikersonderzoeken. Ook het verwerken van feedback, die we wellicht ook van u hebben gehad, moet nog worden gedaan.',
          'In januari gaan we om de tafel met de stakeholders om te kijken naar onze roadmap. Zodat we nieuwe features kunnen gaan toevoegen waar we de Amsterdammer nog beter mee van dienst kunnen zijn! Denk aan het openen van een GFT-container met uw telefoon of een digitale Stadspas.',
          'Met gepaste trots blikken we terug op een jaar waarin we al veel hebben bereikt. En met veel enthousiasme kijken we uit naar komend jaar!',
        ],
      },
    ],
  },
]
