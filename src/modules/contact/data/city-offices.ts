type Response = {
  cityOffices: CityOffice[]
  visitingHours: VisitingHour[]
}

type CityOffice = {
  identifier: string
  title: string
  image: ImageSource[]
  address: Address
  addressContent?: Section[]
  coordinates: Coordinates
  directionsLink: Link
  visitingContent?: Section[]
  visitingHoursContent?: Section[]
  appointmentLink?: Link
}

type Address = {
  streetName: string
  streetNumber: string
  postalCode: string
  city: string
}

type Coordinates = {
  lat: number
  lon: number
}

type VisitingHour = {
  day: WeekDay
  time: TimeRange
}

type TimeRange = {
  start: string
  end: string
}

export type ImageSource = {
  width: number
  height: number
  src: string
  sizeClass?: string
}

type Link = {
  label: string
  url: string
}

type Section = {
  title?: string
  html: string
}

enum WeekDay {
  'maandag' = 0,
  'dinsdag' = 1,
  'woensdag' = 2,
  'donderdag' = 3,
  'vrijdag' = 4,
  'zaterdag' = 5,
  'zondag' = 6,
}

export const response: Response = {
  cityOffices: [
    {
      identifier: 'city-office-centrum',
      title: 'Stadsloket Centrum',
      image: [
        {
          width: 80,
          height: 45,
          src: '/publish/pages/991437/80px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_80px',
        },
        {
          width: 220,
          height: 124,
          src: '/publish/pages/991437/220px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_220px',
        },
        {
          width: 460,
          height: 258,
          src: '/publish/pages/991437/460px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_460px',
        },
        {
          width: 700,
          height: 393,
          src: '/publish/pages/991437/700px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_700px',
        },
        {
          width: 940,
          height: 528,
          src: '/publish/pages/991437/62044-002-weesp-3aug2021-e-v-eis.jpg',
        },
      ],
      address: {
        streetName: 'Amstel',
        streetNumber: '1',
        postalCode: '1011 PN',
        city: 'Amsterdam',
      },
      coordinates: {
        lat: 52.3742621,
        lon: 4.8909625,
      },
      directionsLink: {
        label: 'Route',
        url: 'https://goo.gl/maps/dUtqzFyNVktNq11L8',
      },
    },
    {
      identifier: 'city-office-west',
      title: 'Stadsloket Nieuw-West',
      image: [
        {
          width: 80,
          height: 45,
          src: '/publish/pages/991437/80px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_80px',
        },
        {
          width: 220,
          height: 124,
          src: '/publish/pages/991437/220px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_220px',
        },
        {
          width: 460,
          height: 258,
          src: '/publish/pages/991437/460px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_460px',
        },
        {
          width: 700,
          height: 393,
          src: '/publish/pages/991437/700px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_700px',
        },
        {
          width: 940,
          height: 528,
          src: '/publish/pages/991437/62044-002-weesp-3aug2021-e-v-eis.jpg',
        },
      ],
      address: {
        streetName: 'Osdorpplein',
        streetNumber: '1000',
        postalCode: '1068 TG',
        city: 'Amsterdam',
      },
      coordinates: {
        lat: 52.3578387,
        lon: 4.8065925,
      },
      directionsLink: {
        label: 'Route',
        url: 'https://goo.gl/maps/RmZF88U17WBkMzv57',
      },
    },
    {
      identifier: 'city-office-noord',
      title: 'Stadsloket Noord',
      image: [
        {
          width: 80,
          height: 45,
          src: '/publish/pages/991437/80px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_80px',
        },
        {
          width: 220,
          height: 124,
          src: '/publish/pages/991437/220px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_220px',
        },
        {
          width: 460,
          height: 258,
          src: '/publish/pages/991437/460px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_460px',
        },
        {
          width: 700,
          height: 393,
          src: '/publish/pages/991437/700px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_700px',
        },
        {
          width: 940,
          height: 528,
          src: '/publish/pages/991437/62044-002-weesp-3aug2021-e-v-eis.jpg',
        },
      ],
      address: {
        streetName: 'Buikslotermeerplein',
        streetNumber: '2000',
        postalCode: '1025 XL',
        city: 'Amsterdam',
      },
      addressContent: [
        {
          title: 'Parkeren in de Bomengarage (P2)',
          html: '<p><span class="Calltoaction-grijs">Het parkeerterrein bij Stadsloket Noord is opgeheven. U kunt parkeren in de Bomengarage aan de IJdoornlaan (P2).&nbsp;Bij het Stadsloket zijn nog wel parkeerplaatsen voor gehandicapten.</span></p>',
        },
      ],
      coordinates: {
        lat: 52.4010321,
        lon: 4.9309679,
      },
      directionsLink: {
        label: 'Route',
        url: 'https://goo.gl/maps/6DGxb6id1vsEBs5K9',
      },
    },
    {
      identifier: 'city-office-oost',
      title: 'Stadsloket Oost',
      image: [
        {
          width: 80,
          height: 45,
          src: '/publish/pages/991437/80px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_80px',
        },
        {
          width: 220,
          height: 124,
          src: '/publish/pages/991437/220px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_220px',
        },
        {
          width: 460,
          height: 258,
          src: '/publish/pages/991437/460px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_460px',
        },
        {
          width: 700,
          height: 393,
          src: '/publish/pages/991437/700px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_700px',
        },
        {
          width: 940,
          height: 528,
          src: '/publish/pages/991437/62044-002-weesp-3aug2021-e-v-eis.jpg',
        },
      ],
      address: {
        streetName: 'Oranje-Vrijstaatplein',
        streetNumber: '2',
        postalCode: '1093 NG',
        city: 'Amsterdam',
      },
      coordinates: {
        lat: 52.3691125,
        lon: 4.8751483,
      },
      directionsLink: {
        label: 'Route',
        url: 'https://goo.gl/maps/SqTh7LJcf6HdMbdB6',
      },
    },
    {
      identifier: 'city-office-west',
      title: 'Stadsloket West',
      image: [
        {
          width: 80,
          height: 45,
          src: '/publish/pages/991437/80px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_80px',
        },
        {
          width: 220,
          height: 124,
          src: '/publish/pages/991437/220px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_220px',
        },
        {
          width: 460,
          height: 258,
          src: '/publish/pages/991437/460px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_460px',
        },
        {
          width: 700,
          height: 393,
          src: '/publish/pages/991437/700px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_700px',
        },
        {
          width: 940,
          height: 528,
          src: '/publish/pages/991437/62044-002-weesp-3aug2021-e-v-eis.jpg',
        },
      ],
      address: {
        streetName: 'Bos en Lommerplein',
        streetNumber: '250',
        postalCode: '1055 EK',
        city: 'Amsterdam',
      },
      coordinates: {
        lat: 52.3780311,
        lon: 4.8452795,
      },
      directionsLink: {
        label: 'Route',
        url: 'https://goo.gl/maps/ggXcZ9yi7dzbA9Xd8',
      },
    },
    {
      identifier: 'city-office-zuid',
      title: 'Stadsloket Zuid',
      image: [
        {
          width: 80,
          height: 45,
          src: '/publish/pages/991437/80px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_80px',
        },
        {
          width: 220,
          height: 124,
          src: '/publish/pages/991437/220px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_220px',
        },
        {
          width: 460,
          height: 258,
          src: '/publish/pages/991437/460px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_460px',
        },
        {
          width: 700,
          height: 393,
          src: '/publish/pages/991437/700px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_700px',
        },
        {
          width: 940,
          height: 528,
          src: '/publish/pages/991437/62044-002-weesp-3aug2021-e-v-eis.jpg',
        },
      ],
      address: {
        streetName: 'President Kennedylaan',
        streetNumber: '293',
        postalCode: '1079 MZ',
        city: 'Amsterdam',
      },
      coordinates: {
        lat: 52.3578387,
        lon: 4.8065925,
      },
      directionsLink: {
        label: 'Route',
        url: 'https://goo.gl/maps/RmZF88U17WBkMzv57',
      },
      visitingContent: [
        {
          html: '<p id="h0e64c76f-52aa-46fb-a65e-c0d2d5c898f4">U kunt in Stadsloket Zuid&nbsp;<strong>alleen langskomen&nbsp;als u een afspraak hebt</strong>. Een afspraak maakt u gemakkelijk en gratis zelf.</p>',
        },
      ],
      appointmentLink: {
        label: 'Afspraak maken op het Stadsloket',
        url: 'https://www.amsterdam.nl/contact/afspraak-maken-stadsloket/',
      },
    },
    {
      identifier: 'city-office-zuidoost',
      title: 'Stadsloket Zuidoost',
      image: [
        {
          width: 80,
          height: 45,
          src: '/publish/pages/991437/80px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_80px',
        },
        {
          width: 220,
          height: 124,
          src: '/publish/pages/991437/220px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_220px',
        },
        {
          width: 460,
          height: 258,
          src: '/publish/pages/991437/460px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_460px',
        },
        {
          width: 700,
          height: 393,
          src: '/publish/pages/991437/700px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_700px',
        },
        {
          width: 940,
          height: 528,
          src: '/publish/pages/991437/62044-002-weesp-3aug2021-e-v-eis.jpg',
        },
      ],
      address: {
        streetName: 'Anton de Komplein',
        streetNumber: '150',
        postalCode: '1102 CW',
        city: 'Amsterdam',
      },
      coordinates: {
        lat: 52.3165644,
        lon: 4.956622,
      },
      directionsLink: {
        label: 'Route',
        url: 'https://goo.gl/maps/jRL1s5RGLLMCnyVM7',
      },
    },
    {
      identifier: 'city-office-weesp',
      title: 'Stadsloket Weesp',
      image: [
        {
          width: 80,
          height: 45,
          src: '/publish/pages/991437/80px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_80px',
        },
        {
          width: 220,
          height: 124,
          src: '/publish/pages/991437/220px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_220px',
        },
        {
          width: 460,
          height: 258,
          src: '/publish/pages/991437/460px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_460px',
        },
        {
          width: 700,
          height: 393,
          src: '/publish/pages/991437/700px/62044-002-weesp-3aug2021-e-v-eis.jpg',
          sizeClass: 'size_700px',
        },
        {
          width: 940,
          height: 528,
          src: '/publish/pages/991437/62044-002-weesp-3aug2021-e-v-eis.jpg',
        },
      ],
      address: {
        streetName: 'Nieuwstraat',
        streetNumber: '70a',
        postalCode: '1381 BD',
        city: 'Weesp',
      },
      coordinates: {
        lat: 52.3578387,
        lon: 4.8065925,
      },
      directionsLink: {
        label: 'Route',
        url: 'https://goo.gl/maps/RmZF88U17WBkMzv57',
      },
      visitingContent: [
        {
          html: '<p id="h0e64c76f-52aa-46fb-a65e-c0d2d5c898f4">U kunt alleen langskomen&nbsp;als u in Weesp woont en een afspraak hebt. Een afspraak maakt u gemakkelijk en gratis zelf.</p>',
        },
      ],
      visitingHoursContent: [
        {
          title: 'Openingstijden burgerzaken, altijd met afspraak:',
          html: '<ul><li>maandag van 08.30 tot 12.00 uur</li><li>dinsdag&nbsp;van 08.30 tot 12.00 uur zonder afspraak</li><li>dinsdag van 14.00 tot 16.00 uur</li><li>woensdag&nbsp;van 08.30 tot 12.00 uur en 14.00 tot 16.00 uur</li><li>donderdag&nbsp;van 08.30 tot 12.00 uur en 14.00 tot 16.00 uur</li><li>vrijdag van 08.30 tot 12.00 uur</li></ul><h4 id="h0319e974-93ff-4733-bc32-7a2a3743263f">Openingstijden receptie en informatiecentrum</h4><p>Voor informatie over stadsgebied Weesp kunt u terecht bij de receptie of het informatiecentrum.</p><ul><li>maandag, dinsdag, woensdag, donderdag: 8.30 - 17.00 uur</li><li>vrijdag: 8.30 - 12.00 uur</li><li>Stadsloket gesloten tijdens <a href="https://www.amsterdam.nl/veelgevraagd/?caseid=%7B7FE77A97-A961-49DA-8E9B-C5F55C692EB6%7D" class="externLink ga-tracked">de feestdagen</a>.</li></ul><h4 id="h199ee306-f236-441e-99d6-50a1225e5a2c">Openingstijden Sociaal loket, altijd met afspraak:</h4><ul><li>maandag, dinsdag, donderdag en vrijdag 8.30-11.00 uur</li><li>woensdag op Papelaan 99 (als onderdeel van Weesper MOP) 9.30-11.30 uur.</li></ul>\n',
        },
      ],
      appointmentLink: {
        label: 'Afspraak maken Stadsloket Weesp',
        url: 'https://formulieren.amsterdam.nl/TriplEforms/DirectRegelen/formulier/nl-NL/evAmsterdam/afspraakmakenweesp.aspx/',
      },
    },
  ],
  visitingHours: [
    {
      day: 0,
      time: {
        start: '09.00',
        end: '17.00',
      },
    },
    {
      day: 1,
      time: {
        start: '09.00',
        end: '17.00',
      },
    },
    {
      day: 2,
      time: {
        start: '09.00',
        end: '17.00',
      },
    },
    {
      day: 3,
      time: {
        start: '09.00',
        end: '20.00',
      },
    },
    {
      day: 4,
      time: {
        start: '09.00',
        end: '17.00',
      },
    },
  ],
}
