export type Borough = {
  id: number
  name: string
}

export const boroughs: Borough[] = [
  {id: 1, name: 'Centrum'},
  {id: 2, name: 'Nieuw-West'},
  {id: 3, name: 'Noord'},
  {id: 4, name: 'Oost'},
  {id: 5, name: 'West'},
  {id: 6, name: 'Zuid'},
  {id: 7, name: 'Zuidoost'},
]

export type NewsArticle = {
  contact?: {
    name: string
    email: string
    phone: string
  }
  date: string
  imageSource: {
    uri: string
  }
  intro: string
  paragraphs: {
    text: string
    title: string
  }[]
  title: string
}

export type Project = {
  body?: {
    what?: string
    when?: string
    where?: string
  }
  boroughId: number
  contact?: {
    email?: string
    firstName?: string
    jobDescription?: string
    list?: string[]
    name?: string
    phone?: string
  }
  id: string
  imageSource: {
    uri: string
  }
  intro?: {
    link?: string
    linkText?: string
    text?: string
    title?: string
  }
  news?: NewsArticle[]
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
    boroughId: 1,
    contact: {
      name: 'Wendy Schipper',
      firstName: 'Wendy',
      jobDescription: 'omgevingsmanager',
      phone: '06 5100 3762',
      email: 'binnenring@amsterdam.nl',
    },
    id: 'marnixstraat-rozengracht',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/961922/stp_marnixstraat_940.jpg',
    },
    intro: {
      text: 'De kruising Marnixstraat – Rozengracht is een druk kruispunt met verkeersbewegingen in alle richtingen. Als onderdeel van de Binnenring en de Oranje Loper is de kruising een belangrijke verbindingsroute. Er rijden veel trams en fietsers, er is op de Rozengracht veel autoverkeer en de brandweer moet in elke richting kunnen uitrukken. Er zijn de laatste jaren al diverse maatregelen genomen om de kruising veiliger te maken, maar voor een grote verandering is een herinrichting van de gehele kruising nodig. Binnen een paar jaar moet het GVB groot onderhoud aan de trambaan uitvoeren waarbij alle tramsporen worden vervangen. Dit moment grijpen we aan om de totale kruising beter in te richten.',
      link: 'https://www.amsterdam.nl/projecten/marnixstraat-rozengracht/voorlopig-ontwerp/',
      linkText: 'Lees meer over het voorlopig ontwerp',
    },
    news: [
      {
        contact: {
          name: 'Martijn Scheerder, omgevingsmanager',
          email: 'martijn.scheerder@amsterdam.nl',
          phone: '0648975912',
        },
        date: '20 juli 2020',
        imageSource: {
          uri: 'https://www.amsterdam.nl/publish/pages/949254/940x415_brouwersgracht_woonboten.jpg',
        },
        intro:
          'De kademuur aan de Brouwersgracht 75-101 en 101A-137 is in slechte staat en moeten wij vernieuwen. Voordat we deze kademuur vernieuwen, moeten we de woonboten aan de oneven zijde van het water verplaatsen.',
        paragraphs: [
          {
            text: 'De vernieuwing vindt plaats vanaf het water. Daarom moeten we de woonboten aan de zuidzijde (oneven huisnummers) naar een tijdelijke wissellocatie verplaatsen. Dat moet in ieder geval gebeuren voordat we met de werkzaamheden in 2022 starten. De woonboten liggen ongeveer 2 jaar op een wissellocatie. Met de woonbootbewoners zijn we in gesprek over welke tijdelijke wissellocaties we kunnen bieden.\nDe woonboten aan de noordkant van de Brouwersgracht – even huisnummers – blijven liggen. De kademuur aan de even zijde vervangen we niet.',
            title: 'Tijdelijke wissellocatie',
          },
        ],
        title: 'Woonboten oneven zijde Brouwersgracht worden verplaatst',
      },
      {
        date: '1 juni 2021',
        imageSource: {
          uri: 'https://www.amsterdam.nl/publish/pages/972370/940x415_da_costakade_maatregel.jpg',
        },
        intro:
          'De kademuur ter hoogte van de Da Costakade 91 tot en met 95 laat beweging zien. Dat blijkt uit recente metingen van de kade. We nemen op korte termijn maatregelen om het gewicht op de kade te verminderen en de kade veilig te houden.',
        paragraphs: [
          {
            text: 'We heffen 9 parkeervakken op de kade ter hoogte van de Da Costakade 91 tot en met 95 op. Vanaf 1 juli 2021 is het niet meer toegestaan om met voertuigen zwaarder dan 30 ton te rijden over de oostzijde van de Da Costakade tussen de Potgieterstraat en de De Clercqstraat. Ontheffingen voor verkeer zwaarder dan 30 ton die eerder zijn afgegeven zijn hier niet meer geldig.\nDeze maatregelen blijven gelden tot aan de vernieuwing van de kademuur. De vernieuwing van de kademuren van de Da Costakade staat gepland tussen eind 2022 en eind 2026.',
            title: 'Wat er gaat gebeuren',
          },
          {
            text: 'We heffen de 9 parkeerplaatsen tussen de Potgieterstraat / Jacobus Craandijkbrug en de Da Costakade 89 op. De gehandicaptenparkeerplaats ter hoogte van de Da Costakade 89 blijft beschikbaar. Dit geldt ook voor de parkeerplaatsen ter hoogte van huisnummers 89 tot en met 53.',
            title: 'Parkeerplaatsen',
          },
          {
            text: 'Zware vrachtwagens van meer dan 30 ton kunnen vanaf 1 juli 2021 niet meer over de oostzijde van de Da Costakade tussen de Potgieterstraat en de De Clercqstraat. Vuilniswagens zijn lichter dan 30 ton en kunnen gewoon het huishoudelijk afval ophalen.',
            title: 'Zwaar verkeer',
          },
        ],
        title: 'Veiligheidsmaatregelen Da Costakade 91 tot en met 95',
      },
    ],
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
    boroughId: 1,
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
    news: [
      {
        contact: {
          name: 'Martijn Scheerder, omgevingsmanager',
          email: 'martijn.scheerder@amsterdam.nl',
          phone: '0648975912',
        },
        date: '20 juli 2020',
        imageSource: {
          uri: 'https://www.amsterdam.nl/publish/pages/949254/940x415_brouwersgracht_woonboten.jpg',
        },
        intro:
          'De kademuur aan de Brouwersgracht 75-101 en 101A-137 is in slechte staat en moeten wij vernieuwen. Voordat we deze kademuur vernieuwen, moeten we de woonboten aan de oneven zijde van het water verplaatsen.',
        paragraphs: [
          {
            text: 'De vernieuwing vindt plaats vanaf het water. Daarom moeten we de woonboten aan de zuidzijde (oneven huisnummers) naar een tijdelijke wissellocatie verplaatsen. Dat moet in ieder geval gebeuren voordat we met de werkzaamheden in 2022 starten. De woonboten liggen ongeveer 2 jaar op een wissellocatie. Met de woonbootbewoners zijn we in gesprek over welke tijdelijke wissellocaties we kunnen bieden.\nDe woonboten aan de noordkant van de Brouwersgracht – even huisnummers – blijven liggen. De kademuur aan de even zijde vervangen we niet.',
            title: 'Tijdelijke wissellocatie',
          },
        ],
        title: 'Woonboten oneven zijde Brouwersgracht worden verplaatst',
      },
      {
        date: '1 juni 2021',
        imageSource: {
          uri: 'https://www.amsterdam.nl/publish/pages/972370/940x415_da_costakade_maatregel.jpg',
        },
        intro:
          'De kademuur ter hoogte van de Da Costakade 91 tot en met 95 laat beweging zien. Dat blijkt uit recente metingen van de kade. We nemen op korte termijn maatregelen om het gewicht op de kade te verminderen en de kade veilig te houden.',
        paragraphs: [
          {
            text: 'We heffen 9 parkeervakken op de kade ter hoogte van de Da Costakade 91 tot en met 95 op. Vanaf 1 juli 2021 is het niet meer toegestaan om met voertuigen zwaarder dan 30 ton te rijden over de oostzijde van de Da Costakade tussen de Potgieterstraat en de De Clercqstraat. Ontheffingen voor verkeer zwaarder dan 30 ton die eerder zijn afgegeven zijn hier niet meer geldig.\nDeze maatregelen blijven gelden tot aan de vernieuwing van de kademuur. De vernieuwing van de kademuren van de Da Costakade staat gepland tussen eind 2022 en eind 2026.',
            title: 'Wat er gaat gebeuren',
          },
          {
            text: 'We heffen de 9 parkeerplaatsen tussen de Potgieterstraat / Jacobus Craandijkbrug en de Da Costakade 89 op. De gehandicaptenparkeerplaats ter hoogte van de Da Costakade 89 blijft beschikbaar. Dit geldt ook voor de parkeerplaatsen ter hoogte van huisnummers 89 tot en met 53.',
            title: 'Parkeerplaatsen',
          },
          {
            text: 'Zware vrachtwagens van meer dan 30 ton kunnen vanaf 1 juli 2021 niet meer over de oostzijde van de Da Costakade tussen de Potgieterstraat en de De Clercqstraat. Vuilniswagens zijn lichter dan 30 ton en kunnen gewoon het huishoudelijk afval ophalen.',
            title: 'Zwaar verkeer',
          },
        ],
        title: 'Veiligheidsmaatregelen Da Costakade 91 tot en met 95',
      },
    ],
    title: 'Oranje Loper: vernieuwing 9 bruggen en 5 straten',
    url: 'https://www.amsterdam.nl/projecten/oranjeloper',
  },
  {
    body: {
      what:
        'Op het Oosterdokseiland, voorheen een spooremplacement en distributiecentrum van de post, is een nieuw stuk binnenstad gecreëerd. Projectontwikkelaar BPD startte in 2003 met de bouw. Inmiddels is er een divers aanbod aan kantoren, appartementen zowel koop als (sociale) huur, winkels, horeca, een hotel, de openbare bibliotheek en het conservatorium opgeleverd. De gemeente zorgde voor een aantrekkelijk extra stuk openbare ruimte door de aanleg van een mooie houten wandelsteiger in het Oosterdok.\n\n' +
        'Op het  laatste stuk nog onbebouwde grond van Oosterdokseiland, realiseert projectontwikkelaar BPD nu ongeveer 42 appartementen, een nieuw kantoor voor Booking.com met bijbehorende fietsenstalling, de uitbreiding van de parkeergarage met 349 plekken. Verder komt er 1.500 m2 publiek toegankelijke ruimtes op de begane grond van het nieuwe pand.',
      when: 'In januari 2018 is met de laatste bebouwing op het Oosterdokseiland gestart. Naar verwachting wordt de openbare ruimte in 2021 ingericht. Na oplevering van dit project in 2021 is het Oosterdokseiland volledig afgebouwd.',
      where:
        'Oosterdokseiland ligt in het hart van het centrum, op een steenworp afstand van station Amsterdam Centraal en aan het water van het Oosterdok.',
    },
    boroughId: 1,
    contact: {
      name: 'Wies Daamen',
      firstName: 'Wies',
      jobDescription: 'gebiedsregisseur',
      email: 'w.daamen@amsterdam.nl',
    },
    id: 'oosterdokseiland',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/792070/1706308_amsterdam_ec_-_web.jpg',
    },
    news: [
      {
        contact: {
          name: 'Martijn Scheerder, omgevingsmanager',
          email: 'martijn.scheerder@amsterdam.nl',
          phone: '0648975912',
        },
        date: '20 juli 2020',
        imageSource: {
          uri: 'https://www.amsterdam.nl/publish/pages/949254/940x415_brouwersgracht_woonboten.jpg',
        },
        intro:
          'De kademuur aan de Brouwersgracht 75-101 en 101A-137 is in slechte staat en moeten wij vernieuwen. Voordat we deze kademuur vernieuwen, moeten we de woonboten aan de oneven zijde van het water verplaatsen.',
        paragraphs: [
          {
            text: 'De vernieuwing vindt plaats vanaf het water. Daarom moeten we de woonboten aan de zuidzijde (oneven huisnummers) naar een tijdelijke wissellocatie verplaatsen. Dat moet in ieder geval gebeuren voordat we met de werkzaamheden in 2022 starten. De woonboten liggen ongeveer 2 jaar op een wissellocatie. Met de woonbootbewoners zijn we in gesprek over welke tijdelijke wissellocaties we kunnen bieden.\nDe woonboten aan de noordkant van de Brouwersgracht – even huisnummers – blijven liggen. De kademuur aan de even zijde vervangen we niet.',
            title: 'Tijdelijke wissellocatie',
          },
        ],
        title: 'Woonboten oneven zijde Brouwersgracht worden verplaatst',
      },
      {
        date: '1 juni 2021',
        imageSource: {
          uri: 'https://www.amsterdam.nl/publish/pages/972370/940x415_da_costakade_maatregel.jpg',
        },
        intro:
          'De kademuur ter hoogte van de Da Costakade 91 tot en met 95 laat beweging zien. Dat blijkt uit recente metingen van de kade. We nemen op korte termijn maatregelen om het gewicht op de kade te verminderen en de kade veilig te houden.',
        paragraphs: [
          {
            text: 'We heffen 9 parkeervakken op de kade ter hoogte van de Da Costakade 91 tot en met 95 op. Vanaf 1 juli 2021 is het niet meer toegestaan om met voertuigen zwaarder dan 30 ton te rijden over de oostzijde van de Da Costakade tussen de Potgieterstraat en de De Clercqstraat. Ontheffingen voor verkeer zwaarder dan 30 ton die eerder zijn afgegeven zijn hier niet meer geldig.\nDeze maatregelen blijven gelden tot aan de vernieuwing van de kademuur. De vernieuwing van de kademuren van de Da Costakade staat gepland tussen eind 2022 en eind 2026.',
            title: 'Wat er gaat gebeuren',
          },
          {
            text: 'We heffen de 9 parkeerplaatsen tussen de Potgieterstraat / Jacobus Craandijkbrug en de Da Costakade 89 op. De gehandicaptenparkeerplaats ter hoogte van de Da Costakade 89 blijft beschikbaar. Dit geldt ook voor de parkeerplaatsen ter hoogte van huisnummers 89 tot en met 53.',
            title: 'Parkeerplaatsen',
          },
          {
            text: 'Zware vrachtwagens van meer dan 30 ton kunnen vanaf 1 juli 2021 niet meer over de oostzijde van de Da Costakade tussen de Potgieterstraat en de De Clercqstraat. Vuilniswagens zijn lichter dan 30 ton en kunnen gewoon het huishoudelijk afval ophalen.',
            title: 'Zwaar verkeer',
          },
        ],
        title: 'Veiligheidsmaatregelen Da Costakade 91 tot en met 95',
      },
    ],
    title: 'Oosterdokseiland: een plek om te werken, wonen en recreëren',
    url: 'https://www.amsterdam.nl/projecten/oosterdokseiland/',
  },
  {
    body: {
      what: 'Om de Oudekerkstoren in goede conditie te houden voeren we onderhoudswerk uit aan onder andere het metsel- en voegwerk en aan het carillon. Ook vervangen we gedeeltelijk het lood, omdat de conditie van het lood bij de klok in de loop der jaren is verslechterd.',
      when: 'Deze renovatie duurt van eind november 2020 tot en met eind september.',
      where: 'De Oude Kerk in het centrum van de stad (Oudekerksplein 15).',
    },
    boroughId: 1,
    contact: {
      name: 'Jan van Ingen',
      firstName: 'Jan',
      jobDescription: 'projectleider',
      phone: '06 5434 0834',
      email: 'oudekerkstoren@koninklijkewoudenberg.nl',
    },
    id: 'oudekerkstoren',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/956867/oudekerkstoren-amsterdam-940x415.jpg',
    },
    news: [
      {
        contact: {
          name: 'Martijn Scheerder, omgevingsmanager',
          email: 'martijn.scheerder@amsterdam.nl',
          phone: '0648975912',
        },
        date: '20 juli 2020',
        imageSource: {
          uri: 'https://www.amsterdam.nl/publish/pages/949254/940x415_brouwersgracht_woonboten.jpg',
        },
        intro:
          'De kademuur aan de Brouwersgracht 75-101 en 101A-137 is in slechte staat en moeten wij vernieuwen. Voordat we deze kademuur vernieuwen, moeten we de woonboten aan de oneven zijde van het water verplaatsen.',
        paragraphs: [
          {
            text: 'De vernieuwing vindt plaats vanaf het water. Daarom moeten we de woonboten aan de zuidzijde (oneven huisnummers) naar een tijdelijke wissellocatie verplaatsen. Dat moet in ieder geval gebeuren voordat we met de werkzaamheden in 2022 starten. De woonboten liggen ongeveer 2 jaar op een wissellocatie. Met de woonbootbewoners zijn we in gesprek over welke tijdelijke wissellocaties we kunnen bieden.\nDe woonboten aan de noordkant van de Brouwersgracht – even huisnummers – blijven liggen. De kademuur aan de even zijde vervangen we niet.',
            title: 'Tijdelijke wissellocatie',
          },
        ],
        title: 'Woonboten oneven zijde Brouwersgracht worden verplaatst',
      },
      {
        date: '1 juni 2021',
        imageSource: {
          uri: 'https://www.amsterdam.nl/publish/pages/972370/940x415_da_costakade_maatregel.jpg',
        },
        intro:
          'De kademuur ter hoogte van de Da Costakade 91 tot en met 95 laat beweging zien. Dat blijkt uit recente metingen van de kade. We nemen op korte termijn maatregelen om het gewicht op de kade te verminderen en de kade veilig te houden.',
        paragraphs: [
          {
            text: 'We heffen 9 parkeervakken op de kade ter hoogte van de Da Costakade 91 tot en met 95 op. Vanaf 1 juli 2021 is het niet meer toegestaan om met voertuigen zwaarder dan 30 ton te rijden over de oostzijde van de Da Costakade tussen de Potgieterstraat en de De Clercqstraat. Ontheffingen voor verkeer zwaarder dan 30 ton die eerder zijn afgegeven zijn hier niet meer geldig.\nDeze maatregelen blijven gelden tot aan de vernieuwing van de kademuur. De vernieuwing van de kademuren van de Da Costakade staat gepland tussen eind 2022 en eind 2026.',
            title: 'Wat er gaat gebeuren',
          },
          {
            text: 'We heffen de 9 parkeerplaatsen tussen de Potgieterstraat / Jacobus Craandijkbrug en de Da Costakade 89 op. De gehandicaptenparkeerplaats ter hoogte van de Da Costakade 89 blijft beschikbaar. Dit geldt ook voor de parkeerplaatsen ter hoogte van huisnummers 89 tot en met 53.',
            title: 'Parkeerplaatsen',
          },
          {
            text: 'Zware vrachtwagens van meer dan 30 ton kunnen vanaf 1 juli 2021 niet meer over de oostzijde van de Da Costakade tussen de Potgieterstraat en de De Clercqstraat. Vuilniswagens zijn lichter dan 30 ton en kunnen gewoon het huishoudelijk afval ophalen.',
            title: 'Zwaar verkeer',
          },
        ],
        title: 'Veiligheidsmaatregelen Da Costakade 91 tot en met 95',
      },
    ],
    title: 'Oudekerkstoren: renovatie binnen- en buitenzijde',
    url: '',
  },
  {
    body: {
      what:
        'De verkeersveiligheid in de omgeving van de Plantage Parklaan, de Plantage Kerklaan en de Roetersstraat kan beter. We gaan een 30 kilometer-per-uur gebied instellen met snelheidsverlagende drempels en met behoud van tweerichtingsverkeer voor auto’s.\n\n' +
        'De rijbaan van de Plantage Parklaan tussen de Anne Frankstraat en Plantage Middenlaan gaan we verschuiven richting de woningen.\n\n' +
        'Ook maken we het kruispunt van de Plantage Middenlaan met de Plantage Parklaan overzichtelijker.\n\n' +
        'In de Plantage Kerklaan en Roetersstraat gaan we de rode fietsstroken verbreden. Bij de Boekmanschool op de Roetersstraat komt knipperende led-verlichting in het asfalt bij het zebrapad.',
      when:
        'De globale planning van het project is als volgt:\n\n' +
        '– Participatie: december 2020\n' +
        '– Uitvoering: derde of vierde kwartaal 2021',
      where:
        'De omgeving van de Plantage Parklaan, de Plantage Kerklaan en de Roetersstraat in de Plantagebuurt in stadsdeel Centrum.',
    },
    boroughId: 1,
    contact: {
      name: 'Geesje Albrecht',
      firstName: 'Geesje',
      jobDescription: 'omgevingsmanager',
      phone: '06 1137 7741',
    },
    id: 'plantagebuurt',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/959014/plantagebuurt-940x415.jpg',
    },
    news: [
      {
        contact: {
          name: 'Martijn Scheerder, omgevingsmanager',
          email: 'martijn.scheerder@amsterdam.nl',
          phone: '0648975912',
        },
        date: '20 juli 2020',
        imageSource: {
          uri: 'https://www.amsterdam.nl/publish/pages/949254/940x415_brouwersgracht_woonboten.jpg',
        },
        intro:
          'De kademuur aan de Brouwersgracht 75-101 en 101A-137 is in slechte staat en moeten wij vernieuwen. Voordat we deze kademuur vernieuwen, moeten we de woonboten aan de oneven zijde van het water verplaatsen.',
        paragraphs: [
          {
            text: 'De vernieuwing vindt plaats vanaf het water. Daarom moeten we de woonboten aan de zuidzijde (oneven huisnummers) naar een tijdelijke wissellocatie verplaatsen. Dat moet in ieder geval gebeuren voordat we met de werkzaamheden in 2022 starten. De woonboten liggen ongeveer 2 jaar op een wissellocatie. Met de woonbootbewoners zijn we in gesprek over welke tijdelijke wissellocaties we kunnen bieden.\nDe woonboten aan de noordkant van de Brouwersgracht – even huisnummers – blijven liggen. De kademuur aan de even zijde vervangen we niet.',
            title: 'Tijdelijke wissellocatie',
          },
        ],
        title: 'Woonboten oneven zijde Brouwersgracht worden verplaatst',
      },
      {
        date: '1 juni 2021',
        imageSource: {
          uri: 'https://www.amsterdam.nl/publish/pages/972370/940x415_da_costakade_maatregel.jpg',
        },
        intro:
          'De kademuur ter hoogte van de Da Costakade 91 tot en met 95 laat beweging zien. Dat blijkt uit recente metingen van de kade. We nemen op korte termijn maatregelen om het gewicht op de kade te verminderen en de kade veilig te houden.',
        paragraphs: [
          {
            text: 'We heffen 9 parkeervakken op de kade ter hoogte van de Da Costakade 91 tot en met 95 op. Vanaf 1 juli 2021 is het niet meer toegestaan om met voertuigen zwaarder dan 30 ton te rijden over de oostzijde van de Da Costakade tussen de Potgieterstraat en de De Clercqstraat. Ontheffingen voor verkeer zwaarder dan 30 ton die eerder zijn afgegeven zijn hier niet meer geldig.\nDeze maatregelen blijven gelden tot aan de vernieuwing van de kademuur. De vernieuwing van de kademuren van de Da Costakade staat gepland tussen eind 2022 en eind 2026.',
            title: 'Wat er gaat gebeuren',
          },
          {
            text: 'We heffen de 9 parkeerplaatsen tussen de Potgieterstraat / Jacobus Craandijkbrug en de Da Costakade 89 op. De gehandicaptenparkeerplaats ter hoogte van de Da Costakade 89 blijft beschikbaar. Dit geldt ook voor de parkeerplaatsen ter hoogte van huisnummers 89 tot en met 53.',
            title: 'Parkeerplaatsen',
          },
          {
            text: 'Zware vrachtwagens van meer dan 30 ton kunnen vanaf 1 juli 2021 niet meer over de oostzijde van de Da Costakade tussen de Potgieterstraat en de De Clercqstraat. Vuilniswagens zijn lichter dan 30 ton en kunnen gewoon het huishoudelijk afval ophalen.',
            title: 'Zwaar verkeer',
          },
        ],
        title: 'Veiligheidsmaatregelen Da Costakade 91 tot en met 95',
      },
    ],
    title: 'Plantagebuurt: verbeteren verkeersveiligheid',
    url: 'https://www.amsterdam.nl/projecten/plantagebuurt',
  },
  {
    body: {
      when: 'Tot 2027 bouwen we in Amstel III zo’n 10.000 kleinere stadswoningen. Na 2027 kunnen hier nog eens 5.000 woningen bijkomen. Dat gebeurt niet in één keer, maar in verschillende deelprojecten.',
      where:
        'Amstel III is meer dan 200 voetbalvelden groot en ligt tussen station Bijlmer ArenA, de A2, het Amsterdam UMC – locatie AMC en het spoor. Het is een van de best bereikbare plekken in Nederland: het ligt in de nabijheid van 2 metrolijnen, een spoorverbinding, busverbindingen en de A2. Midden door het gebied loopt de snelweg A9.\n\n' +
        'Amstel III kent 2 type gebieden: een typisch bedrijventerrein langs de A2 waar onder andere autodealers zitten en een kantorengebied langs het spoor waar komende jaren veel woningen worden bijgebouwd. Op het bedrijventerrein blijft juist ruimte voor bedrijven. Daar komen geen woningen.',
    },
    boroughId: 7,
    contact: {
      email: 'amsterl3@amsterdam.nl',
    },
    id: 'amstel3',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/853952/a3_bw.jpg',
    },
    intro: {
      title: 'Van kantorengebied naar een gemengde stadswijk',
      text:
        'Het woongebied van Amsterdam Zuidoost breidt uit. De oude kantoorgebouwen in Amstel III maken plaats voor een groene gemengde stadswijk waar je plezierig kunt wonen, werken en leuke dingen kunt doen. Tot 2027 bouwen we hier zo’n 10.000 kleinere stadswoningen. Na 2027 kunnen hier nog eens 5.000 woningen bijkomen. Op de begane grond komen veel voorzieningen, zoals scholen, gezondheids- en jongerencentrum en buurtkamers. Langs het spoor en tussen de ArenA en de Ikea komen parken om te sporten en ontspannen. Het gebied stimuleert mensen om veel te gaan lopen, fietsen en het openbaar vervoer te gebruiken.\n\n' +
        '[WAT KOMT ER (accordion)]',
    },
    news: [
      {
        contact: {
          name: 'Martijn Scheerder, omgevingsmanager',
          email: 'martijn.scheerder@amsterdam.nl',
          phone: '0648975912',
        },
        date: '20 juli 2020',
        imageSource: {
          uri: 'https://www.amsterdam.nl/publish/pages/949254/940x415_brouwersgracht_woonboten.jpg',
        },
        intro:
          'De kademuur aan de Brouwersgracht 75-101 en 101A-137 is in slechte staat en moeten wij vernieuwen. Voordat we deze kademuur vernieuwen, moeten we de woonboten aan de oneven zijde van het water verplaatsen.',
        paragraphs: [
          {
            text: 'De vernieuwing vindt plaats vanaf het water. Daarom moeten we de woonboten aan de zuidzijde (oneven huisnummers) naar een tijdelijke wissellocatie verplaatsen. Dat moet in ieder geval gebeuren voordat we met de werkzaamheden in 2022 starten. De woonboten liggen ongeveer 2 jaar op een wissellocatie. Met de woonbootbewoners zijn we in gesprek over welke tijdelijke wissellocaties we kunnen bieden.\nDe woonboten aan de noordkant van de Brouwersgracht – even huisnummers – blijven liggen. De kademuur aan de even zijde vervangen we niet.',
            title: 'Tijdelijke wissellocatie',
          },
        ],
        title: 'Woonboten oneven zijde Brouwersgracht worden verplaatst',
      },
      {
        date: '1 juni 2021',
        imageSource: {
          uri: 'https://www.amsterdam.nl/publish/pages/972370/940x415_da_costakade_maatregel.jpg',
        },
        intro:
          'De kademuur ter hoogte van de Da Costakade 91 tot en met 95 laat beweging zien. Dat blijkt uit recente metingen van de kade. We nemen op korte termijn maatregelen om het gewicht op de kade te verminderen en de kade veilig te houden.',
        paragraphs: [
          {
            text: 'We heffen 9 parkeervakken op de kade ter hoogte van de Da Costakade 91 tot en met 95 op. Vanaf 1 juli 2021 is het niet meer toegestaan om met voertuigen zwaarder dan 30 ton te rijden over de oostzijde van de Da Costakade tussen de Potgieterstraat en de De Clercqstraat. Ontheffingen voor verkeer zwaarder dan 30 ton die eerder zijn afgegeven zijn hier niet meer geldig.\nDeze maatregelen blijven gelden tot aan de vernieuwing van de kademuur. De vernieuwing van de kademuren van de Da Costakade staat gepland tussen eind 2022 en eind 2026.',
            title: 'Wat er gaat gebeuren',
          },
          {
            text: 'We heffen de 9 parkeerplaatsen tussen de Potgieterstraat / Jacobus Craandijkbrug en de Da Costakade 89 op. De gehandicaptenparkeerplaats ter hoogte van de Da Costakade 89 blijft beschikbaar. Dit geldt ook voor de parkeerplaatsen ter hoogte van huisnummers 89 tot en met 53.',
            title: 'Parkeerplaatsen',
          },
          {
            text: 'Zware vrachtwagens van meer dan 30 ton kunnen vanaf 1 juli 2021 niet meer over de oostzijde van de Da Costakade tussen de Potgieterstraat en de De Clercqstraat. Vuilniswagens zijn lichter dan 30 ton en kunnen gewoon het huishoudelijk afval ophalen.',
            title: 'Zwaar verkeer',
          },
        ],
        title: 'Veiligheidsmaatregelen Da Costakade 91 tot en met 95',
      },
    ],
    title: 'Amstel III: ontwikkeling woongebied gemixt met werken',
    url: 'https://www.amsterdam.nl/projecten/amstel3/',
  },
]
