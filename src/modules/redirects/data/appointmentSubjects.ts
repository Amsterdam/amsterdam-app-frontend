type Link = {
  label: string
  url: string
}

type AppointmentSubject = {
  links?: Link[]
  requiresPhoneCall?: boolean
  text?: string
  title: string
}

enum Url {
  acknowledgeChild = 'https://www.amsterdam.nl/veelgevraagd/?productid=%7B6C003487-DED7-4AE6-9FFD-C606D0AB0BD7%7D',
  birth = 'https://www.amsterdam.nl/veelgevraagd/?productid=%7BE353AEAA-5987-4C5B-AB9B-3C3DCF467046%7D',
  immigration = 'https://www.amsterdam.nl/burgerzaken/immigratie',
  lifelessBirth = 'https://www.amsterdam.nl/veelgevraagd/?productid=%7BE9ED0F9D-6254-4236-8D10-D970655DAAF8%7D#case_%7BB104B52F-9A3B-4923-8B5D-1FA60B6F3591%7D',
  marriage = 'https://www.amsterdam.nl/burgerzaken/trouwen-partnerschap/',
  marriagePermission = 'https://www.amsterdam.nl/veelgevraagd/?productid=%7B6F08AB32-17C7-45B2-BC74-EDD29BA9FEDD%7D#case_%7B0F588CAC-30A3-4ED1-B355-10F9EE8759D9%7D',
  naturalisation = 'https://www.amsterdam.nl/burgerzaken/naturalisatie',
  passing = 'https://www.amsterdam.nl/burgerzaken/aangifte-doen-van-overlijden',
  passingForFuneralDirectors = 'https://www.amsterdam.nl/burgerzaken/aangifte-voor-uitvaartondernemers',
}

export const appointmentSubjects: AppointmentSubject[] = [
  {
    text: 'Voor een paspoort, ID-kaart of rijbewijs kunt u zonder afspraak langskomen bij onze Stadsloketten.',
    title: 'Paspoort, ID-kaart of rijbewijs',
  },
  {
    links: [
      {
        label: 'Immigratie',
        url: Url.immigration,
      },
      {
        label: 'Naturalisatie',
        url: Url.naturalisation,
      },
    ],
    requiresPhoneCall: true,
    title: 'Immigratie en Nederlander worden',
  },
  {
    links: [
      {
        label: 'Geboorteaangifte',
        url: Url.birth,
      },
      {
        label: 'Een kind erkennen',
        url: Url.acknowledgeChild,
      },
      {
        label: 'Levenloos geboren kindje registreren (pasgeboren)',
        url: Url.lifelessBirth,
      },
    ],
    title: 'Geboorte en erkenning',
  },
  {
    links: [
      {
        label: 'Trouwen en partnerschap',
        url: Url.marriage,
      },
      {
        label: 'Verklaring van huwelijksbevoegdheid',
        url: Url.marriagePermission,
      },
    ],
    title: 'Huwelijk en geregistreerd partnerschap',
  },
  {
    links: [
      {
        label: 'Aangifte van overlijden voor uitvaartondernemers',
        url: Url.passingForFuneralDirectors,
      },
      {
        label: 'Aangifte doen van overlijden',
        url: Url.passing,
      },
    ],
    title: 'Overlijden',
  },
  {
    requiresPhoneCall: true,
    title: 'Buitenlandse akten inleveren (brondocumenten)',
  },
]
