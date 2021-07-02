export type Project = {
  body?: {
    lead?: string
    leadLink?: string
    what?: string
    when?: string
    where?: string
  }
  contact?: {
    name?: string
    jobDescription?: string
    phone?: string
    email?: string
  }
  id: string
  imageSource: {
    uri: string
  }
  title: string
}

export const projects: Project[] = [
  {
    body: {
      lead: 'De kruising Marnixstraat – Rozengracht is een druk kruispunt met verkeersbewegingen in alle richtingen. Als onderdeel van de Binnenring en de Oranje Loper is de kruising een belangrijke verbindingsroute. Er rijden veel trams en fietsers, er is op de Rozengracht veel autoverkeer en de brandweer moet in elke richting kunnen uitrukken. Er zijn de laatste jaren al diverse maatregelen genomen om de kruising veiliger te maken, maar voor een grote verandering is een herinrichting van de gehele kruising nodig. Binnen een paar jaar moet het GVB groot onderhoud aan de trambaan uitvoeren waarbij alle tramsporen worden vervangen. Dit moment grijpen we aan om de totale kruising beter in te richten.',
      leadLink:
        'https://www.amsterdam.nl/projecten/marnixstraat-rozengracht/voorlopig-ontwerp/',
      when: '<div class="iprox-rich-content iprox-content tekst"><p>De planning is nog niet bekend. De aanpak van de kruising wordt meegenomen in het project <a class="siteLink ptsubhome ga-tracked" href="https://www.amsterdam.nl/projecten/oranjeloper/">Oranje Loper</a> vanwege de samenhang met de werkzaamheden aan de bruggen over over de <a class="siteLink ptnieuwsartikel ga-tracked" href="https://www.amsterdam.nl/projecten/oranjeloper/bruggen-oranjeloper/bruggen-oranje-loper/jordaanbrug/">Lijnbaansgracht</a> en <a class="siteLink ptnieuwsartikel ga-tracked" href="https://www.amsterdam.nl/projecten/oranjeloper/bruggen-oranjeloper/bruggen-oranje-loper/rijckerbrug/">Singelgracht</a>. In 2021 wordt gestart met voorbereidende werkzaamheden aan de bruggen.</p></div>',
      where:
        'De kruising Marnixstraat – Rozengracht ligt aan de westzijde van het centrum.',
    },
    contact: {
      name: 'Wendy Schipper',
      jobDescription: 'omgevingsmanager',
      phone: '06 5100 3762',
      email: 'binnenring@amsterdam.nl',
    },
    id: 'marnixstraat-rozengracht',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/961922/stp_marnixstraat_940.jpg',
    },
    title: 'Marnixstraat-Rozengracht: herinrichting kruispunt',
  },
  {
    id: 'oranjeloper',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/966195/940x415_a_programma_brug.jpg',
    },
    title: 'Oranje Loper: vernieuwing 9 bruggen en 5 straten',
  },
  {
    body: {
      what: '<div><p>Op het Oosterdokseiland, voorheen een spooremplacement en distributiecentrum van de post, is een nieuw stuk binnenstad gecreëerd. Projectontwikkelaar BPD startte in 2003 met de bouw. Inmiddels is er een divers aanbod aan kantoren, appartementen zowel koop als (sociale) huur, winkels, horeca, een hotel, de openbare bibliotheek en het conservatorium opgeleverd. De gemeente zorgde voor een aantrekkelijk extra stuk openbare ruimte door de aanleg van een mooie houten wandelsteiger in het Oosterdok.</p><p>Op het  laatste stuk nog onbebouwde grond van Oosterdokseiland, realiseert projectontwikkelaar BPD nu ongeveer 42 appartementen, een nieuw kantoor voor Booking.com met bijbehorende fietsenstalling, de uitbreiding van de parkeergarage met 349 plekken. Verder komt er 1.500 m2 publiek toegankelijke ruimtes op de begane grond van het nieuwe pand.</p></div>',
      when: 'In januari 2018 is met de laatste bebouwing op het Oosterdokseiland gestart. Naar verwachting wordt de openbare ruimte in 2021 ingericht. Na oplevering van dit project in 2021 is het Oosterdokseiland volledig afgebouwd.',
      where:
        'Oosterdokseiland ligt in het hart van het centrum, op een steenworp afstand van station Amsterdam Centraal en aan het water van het Oosterdok.',
    },
    id: 'oosterdokseiland',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/792070/1706308_amsterdam_ec_-_web.jpg',
    },
    title: 'Oosterdokseiland: een plek om te werken, wonen en recreëren',
  },
  {
    body: {
      what: 'Om de Oudekerkstoren in goede conditie te houden voeren we onderhoudswerk uit aan onder andere het metsel- en voegwerk en aan het carillon. Ook vervangen we gedeeltelijk het lood, omdat de conditie van het lood bij de klok in de loop der jaren is verslechterd.',
      when: 'Deze renovatie duurt van eind november 2020 tot en met eind september.',
      where: 'De Oude Kerk in het centrum van de stad (Oudekerksplein 15).',
    },
    id: 'oudekerkstoren',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/956867/oudekerkstoren-amsterdam-940x415.jpg',
    },
    title: 'Oudekerkstoren: renovatie binnen- en buitenzijde',
  },
  {
    body: {
      what:
        '<div class="iprox-rich-content iprox-content tekst">' +
        "<p>De verkeersveiligheid in de omgeving van de Plantage Parklaan, de Plantage Kerklaan en de Roetersstraat kan beter. We gaan een 30 kilometer-per-uur gebied instellen met snelheidsverlagende drempels en met behoud van tweerichtingsverkeer voor auto's.</p>" +
        '<p>De rijbaan van de Plantage Parklaan tussen de Anne Frankstraat en Plantage Middenlaan gaan we verschuiven richting de woningen.</p>' +
        '<p>Ook maken we het kruispunt van de Plantage Middenlaan met de Plantage Parklaan overzichtelijker.</p>' +
        '<p>In de Plantage Kerklaan en Roetersstraat gaan we de rode fietsstroken verbreden. Bij de Boekmanschool op de Roetersstraat komt knipperende led-verlichting in het asfalt bij het zebrapad.</p>' +
        '</div>',
      when:
        '<div class="iprox-rich-content iprox-content tekst">' +
        '<p>De globale planning van het project is als volgt:</p>' +
        '<ul>' +
        '<li>Participatie: december 2020</li>' +
        '<li>Uitvoering: derde of vierde kwartaal 2021</li>' +
        '</ul>' +
        '</div>',
      where:
        'De omgeving van de Plantage Parklaan, de Plantage Kerklaan en de Roetersstraat in de Plantagebuurt in stadsdeel Centrum.',
    },
    id: 'plantagebuurt',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/959014/plantagebuurt-940x415.jpg',
    },
    title: 'Plantagebuurt: verbeteren verkeersveiligheid',
  },
]
