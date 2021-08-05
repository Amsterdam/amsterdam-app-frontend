export type TimeLineItem = {
  title: string
  content: string
  status: 'current' | 'finished' | 'upcoming'
  subitems:
    | {
        title: string
        content: string
      }[]
    | []
}

export type Timeline = {
  intro: string
  items: TimeLineItem[]
}

export const timeline: Timeline = {
  intro:
    'We moeten de kademuur vernieuwen. Wanneer dit gebeurt, is op dit moment nog niet bekend. In juli en augustus 2021 versterken we de kade. Volgens de huidige planning is de straat vanaf 1 september weer open voor al het toegestane verkeer.',
  items: [
    {
      title: 'Maandag 21 juni',
      content:
        '<div><p>We snoeien van 2 bomen de takken die boven het water uitsteken. Dit is nodig om de lange damwanden te kunnen plaatsen.</p></div>',
      status: 'finished',
      subitems: [],
    },
    {
      title: 'Maandag 28 juni - vrijdag 2 juli',
      content:
        '<div><p>Van maandag 28 juni tot en met vrijdag 2 juli vervangt Liander de gietijzeren gasleiding op de kruising Gasthuismolensteeg en Herengracht. De kruising is dan afgesloten en het leiden we om. De winkels in de Gasthuismolensteeg blijven bereikbaar voor voetgangers.</p><p>Let op: Tijdens de werkzaamheden aan de gasleiding op woensdag 30 juni 2021 is een drinkwaterleiding geraakt, ter hoogte van Herengracht 243. Hierdoor zijn de werkzaamheden vertraagd. De kruising Gasthuismolensteeg en Herengracht blijft afgesloten tot maandag 5 of dinsdag 6 juli. Aannemer Heijmans werkt dagelijks tot 19.00 uur door. Ook op zaterdag zal er gewerkt worden om zoveel mogelijk tijd in te halen. In de loop van zaterdag herstellen we een deel van de straat in de Gasthuismolensteeg, zo kunnen fietsers en voetgangers makkelijker langs het werk.</p></div>',
      status: 'finished',
      subitems: [],
    },
    {
      title: 'Maandag 28 juni - donderdag 1 juli',
      content:
        '<div><p>Van maandag 28 juni tot en met donderdag 1 juli sluit Waternet op 5 plekken in de straat de hemelwaterafvoer aan op het rioolstelstel. Fietsers en voetgangers kunnen langs het werk.</p></div>',
      status: 'finished',
      subitems: [],
    },
    {
      title: 'Vanaf maandag 5 juli',
      content:
        '<div><p>Vanaf maandag 5 juli voeren we via het water de bouwmaterialen en het werkmaterieel aan. In de gracht komen langs de kade pontons te liggen met daarop een grote hijskraan. Op de autoparkeerplaatsen tegenover Herengracht 220 en 244 komen 3 bouwketen voor de medewerkers van de aannemer en de verkeersregelaars.</p></div>',
      status: 'current',
      subitems: [
        {
          title: 'Gemeente werkt de uitkomsten uit in planvarianten',
          content:
            '<div><p>We snoeien van 2 bomen de takken die boven het water uitsteken. Dit is nodig om de lange damwanden te kunnen plaatsen.</p></div>',
        },
        {
          title:
            'Financiële, juridische, planologische, nautische en stadsdeel adviezen op planvarianten',
          content:
            '<div><p>We snoeien van 2 bomen de takken die boven het water uitsteken. Dit is nodig om de lange damwanden te kunnen plaatsen.</p></div>',
        },
        {
          title:
            'College geeft planvarianten (projectnota en nota van uitgangspunten) vrij voor instpraak',
          content:
            '<div><p>We snoeien van 2 bomen de takken die boven het water uitsteken. Dit is nodig om de lange damwanden te kunnen plaatsen.</p></div>',
        },
      ],
    },
    {
      title: 'Donderdag 8 juli',
      content:
        '<div><p>Op donderdag 8 juli plaatsen we bouwhekken op de kade, langs de rijweg. De fietsenrekken aan de waterkant zijn daardoor niet meer bereikbaar en tot 1 september buiten gebruik. Op de kade achter de bouwhekken komen een mobiele kleed-/doucheruimte en een calamiteitenauto van de aannemer te staan.</p></div>',
      status: 'upcoming',
      subitems: [],
    },
  ],
}
