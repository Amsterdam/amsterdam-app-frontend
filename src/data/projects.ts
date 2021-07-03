export type Project = {
  body?: {
    leadLink?: string
    what?: string
    when?: string
    where?: string
  }
  contact?: {
    email?: string
    jobDescription?: string
    list?: string[]
    name?: string
    phone?: string
  }
  id: string
  imageSource: {
    uri: string
  }
  lead?: {
    link?: string
    linkText?: string
    text?: string
  }
  title: string
  url: string
}

export const projects: Project[] = [
  {
    body: {
      when: 'De planning is nog niet bekend. De aanpak van de kruising wordt meegenomen in het project Oranje Loper vanwege de samenhang met de werkzaamheden aan de bruggen over over de Lijnbaansgracht en Singelgracht. In 2021 wordt gestart met voorbereidende werkzaamheden aan de bruggen.',
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
    lead: {
      text: 'De kruising Marnixstraat – Rozengracht is een druk kruispunt met verkeersbewegingen in alle richtingen. Als onderdeel van de Binnenring en de Oranje Loper is de kruising een belangrijke verbindingsroute. Er rijden veel trams en fietsers, er is op de Rozengracht veel autoverkeer en de brandweer moet in elke richting kunnen uitrukken. Er zijn de laatste jaren al diverse maatregelen genomen om de kruising veiliger te maken, maar voor een grote verandering is een herinrichting van de gehele kruising nodig. Binnen een paar jaar moet het GVB groot onderhoud aan de trambaan uitvoeren waarbij alle tramsporen worden vervangen. Dit moment grijpen we aan om de totale kruising beter in te richten.',
      link: 'https://www.amsterdam.nl/projecten/marnixstraat-rozengracht/voorlopig-ontwerp/',
      linkText: 'Lees meer over het voorlopig ontwerp',
    },
    title: 'Marnixstraat-Rozengracht: herinrichting kruispunt',
    url: 'https://www.amsterdam.nl/projecten/marnixstraat-rozengracht/',
  },
  {
    body: {
      what:
        'We vernieuwen de Nieuwezijds Voorburgwal en de straten en 9 bruggen van Raadhuisstraat tot Mercatorplein. De bruggen zijn meer dan 100 jaar oud en in slechte staat. Het verkeer wordt steeds zwaarder. En onze straten steeds drukker.\n\n' +
        'We maken de bruggen weer sterk. Met nieuwe palen en een compleet nieuwe binnenkant. De monumentale buitenkant knappen we op en blijft eruitzien zoals nu. Als we de bruggen aanpakken, willen we ook meteen de straten beter inrichten. Met meer ruimte voor voetgangers, fietsers, de tram en groen.\n\n' +
        'De werkzaamheden vragen veel van de Amsterdammers van nu maar zijn nodig om het gebied ook voor de Amsterdammers van de toekomst veilig, leefbaar en bereikbaar te houden.',
      when: 'Voorlopige planning [tijdslijn hier].',
      where:
        'We werken aan de Nieuwezijds Voorburgwal en de bruggen en straten van Raadhuisstraat tot Mercatorplein. Door het werk aan de bruggen zijn we ook veel aan het werk op de aanliggende grachten en kades. Klik op de kaart hierboven voor meer informatie over de werkzaamheden per straat inclusief de bruggen.\n\n' +
        'Raadhuisstraat - Rozengracht, De Clercqstraat - Jan Evertsenstraat, Nieuwezijds Voorburgwal.',
    },
    contact: {
      list: [
        'Nieuwezijds Voorburgwal: Merel Rinkel, 06 1880 6613',
        'Raadhuisstraat en Rozengracht: Terry van Dijk, 06 5151 8852',
        'De Clercqstraat - Jan Evertsenstraat: Maartje de Nie, 06 1380 3562',
        'Vernieuwing 9 bruggen: Anica Kortland-Dijkstra, 06 2873 9829 en',
        'Boukje Witten, 06 2180 7596',
        'E-mail: oranjeloper@amsterdam.nl',
      ],
    },
    id: 'oranjeloper',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/966195/940x415_a_programma_brug.jpg',
    },
    title: 'Oranje Loper: vernieuwing 9 bruggen en 5 straten',
    url: 'https://www.amsterdam.nl/projecten/oranjeloper',
  },
  {
    body: {
      what: 'Op het Oosterdokseiland, voorheen een spooremplacement en distributiecentrum van de post, is een nieuw stuk binnenstad gecreëerd. Projectontwikkelaar BPD startte in 2003 met de bouw. Inmiddels is er een divers aanbod aan kantoren, appartementen zowel koop als (sociale) huur, winkels, horeca, een hotel, de openbare bibliotheek en het conservatorium opgeleverd. De gemeente zorgde voor een aantrekkelijk extra stuk openbare ruimte door de aanleg van een mooie houten wandelsteiger in het Oosterdok.\n\nOp het  laatste stuk nog onbebouwde grond van Oosterdokseiland, realiseert projectontwikkelaar BPD nu ongeveer 42 appartementen, een nieuw kantoor voor Booking.com met bijbehorende fietsenstalling, de uitbreiding van de parkeergarage met 349 plekken. Verder komt er 1.500 m2 publiek toegankelijke ruimtes op de begane grond van het nieuwe pand.',
      when: 'In januari 2018 is met de laatste bebouwing op het Oosterdokseiland gestart. Naar verwachting wordt de openbare ruimte in 2021 ingericht. Na oplevering van dit project in 2021 is het Oosterdokseiland volledig afgebouwd.',
      where:
        'Oosterdokseiland ligt in het hart van het centrum, op een steenworp afstand van station Amsterdam Centraal en aan het water van het Oosterdok.',
    },
    contact: {
      name: 'Wies Daamen',
      jobDescription: 'gebiedsregisseur',
      email: 'w.daamen@amsterdam.nl',
    },
    id: 'oosterdokseiland',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/792070/1706308_amsterdam_ec_-_web.jpg',
    },
    title: 'Oosterdokseiland: een plek om te werken, wonen en recreëren',
    url: 'https://www.amsterdam.nl/projecten/oosterdokseiland/',
  },
  {
    body: {
      what: 'Om de Oudekerkstoren in goede conditie te houden voeren we onderhoudswerk uit aan onder andere het metsel- en voegwerk en aan het carillon. Ook vervangen we gedeeltelijk het lood, omdat de conditie van het lood bij de klok in de loop der jaren is verslechterd.',
      when: 'Deze renovatie duurt van eind november 2020 tot en met eind september.',
      where: 'De Oude Kerk in het centrum van de stad (Oudekerksplein 15).',
    },
    contact: {
      name: 'Jan van Ingen',
      jobDescription: 'projectleider',
      phone: '06 5434 0834',
      email: 'oudekerkstoren@koninklijkewoudenberg.nl',
    },
    id: 'oudekerkstoren',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/956867/oudekerkstoren-amsterdam-940x415.jpg',
    },
    title: 'Oudekerkstoren: renovatie binnen- en buitenzijde',
    url: '',
  },
  {
    body: {
      what:
        "De verkeersveiligheid in de omgeving van de Plantage Parklaan, de Plantage Kerklaan en de Roetersstraat kan beter. We gaan een 30 kilometer-per-uur gebied instellen met snelheidsverlagende drempels en met behoud van tweerichtingsverkeer voor auto's.\n\n" +
        'De rijbaan van de Plantage Parklaan tussen de Anne Frankstraat en Plantage Middenlaan gaan we verschuiven richting de woningen.\n\n' +
        'Ook maken we het kruispunt van de Plantage Middenlaan met de Plantage Parklaan overzichtelijker.\n\n' +
        'In de Plantage Kerklaan en Roetersstraat gaan we de rode fietsstroken verbreden. Bij de Boekmanschool op de Roetersstraat komt knipperende led-verlichting in het asfalt bij het zebrapad.',
      when:
        'De globale planning van het project is als volgt:\n\n' +
        '– Participatie: december 2020' +
        '– Uitvoering: derde of vierde kwartaal 2021',
      where:
        'De omgeving van de Plantage Parklaan, de Plantage Kerklaan en de Roetersstraat in de Plantagebuurt in stadsdeel Centrum.',
    },
    contact: {
      name: 'Geesje Albrecht',
      jobDescription: 'omgevingsmanager',
      phone: '06 1137 7741',
    },
    id: 'plantagebuurt',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/959014/plantagebuurt-940x415.jpg',
    },
    title: 'Plantagebuurt: verbeteren verkeersveiligheid',
    url: 'https://www.amsterdam.nl/projecten/plantagebuurt',
  },
]
