import React from 'react'
import {Phone} from '@/assets/icons'
import {Button} from '@/components/ui/buttons'
import {Accordion, Box, SingleSelectable} from '@/components/ui/containers'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Link, Paragraph, Title} from '@/components/ui/text'
import {openPhoneUrl, openWebUrl} from '@/utils'

type Section = {
  call?: boolean
  text?: string
  title: string
  externalLinks?: {
    label: string
    url: string
  }[]
}

const externalLinkUrls = {
  birthRegistration:
    'https://www.amsterdam.nl/veelgevraagd/?productid=%7BE353AEAA-5987-4C5B-AB9B-3C3DCF467046%7D',
  childAcknowledgement:
    'https://www.amsterdam.nl/veelgevraagd/?productid=%7B6C003487-DED7-4AE6-9FFD-C606D0AB0BD7%7D',
  declareMarriagePermission:
    'https://www.amsterdam.nl/veelgevraagd/?productid=%7B6F08AB32-17C7-45B2-BC74-EDD29BA9FEDD%7D#case_%7B0F588CAC-30A3-4ED1-B355-10F9EE8759D9%7D',
  declarePassing:
    'https://www.amsterdam.nl/burgerzaken/aangifte-doen-van-overlijden',
  declarePassingForFuneralDirectors:
    'https://www.amsterdam.nl/burgerzaken/aangifte-voor-uitvaartondernemers',
  immigration: 'https://www.amsterdam.nl/burgerzaken/immigratie',
  lifelessBirthRegistration:
    'https://www.amsterdam.nl/veelgevraagd/?productid=%7BE9ED0F9D-6254-4236-8D10-D970655DAAF8%7D#case_%7BB104B52F-9A3B-4923-8B5D-1FA60B6F3591%7D',
  marriage: 'https://www.amsterdam.nl/burgerzaken/trouwen-partnerschap/',
  naturalisation: 'https://www.amsterdam.nl/burgerzaken/naturalisatie',
}

const sections: Section[] = [
  {
    text: 'Voor een paspoort, ID-kaart of rijbewijs kunt u zonder afspraak langskomen bij onze Stadsloketten.',
    title: 'Paspoort, ID-kaart of rijbewijs',
  },
  {
    call: true,
    title: 'Immigratie en Nederlander worden',
    externalLinks: [
      {
        label: 'Immigratie',
        url: externalLinkUrls.immigration,
      },
      {
        label: 'Naturalisatie',
        url: externalLinkUrls.naturalisation,
      },
    ],
  },
  {
    title: 'Geboorte en erkenning',
    externalLinks: [
      {
        label: 'Geboorteaangifte',
        url: externalLinkUrls.birthRegistration,
      },
      {
        label: 'Een kind erkennen',
        url: externalLinkUrls.childAcknowledgement,
      },
      {
        label: 'Levenloos geboren kindje registreren (pasgeboren)',
        url: externalLinkUrls.lifelessBirthRegistration,
      },
    ],
  },
  {
    title: 'Huwelijk en geregistreerd partnerschap',
    externalLinks: [
      {
        label: 'Trouwen en partnerschap',
        url: externalLinkUrls.marriage,
      },
      {
        label: 'Verklaring van huwelijksbevoegdheid',
        url: externalLinkUrls.declareMarriagePermission,
      },
    ],
  },
  {
    title: 'Overlijden',
    externalLinks: [
      {
        label: 'Aangifte van overlijden voor uitvaartondernemers',
        url: externalLinkUrls.declarePassingForFuneralDirectors,
      },
      {
        label: 'Aangifte doen van overlijden',
        url: externalLinkUrls.declarePassing,
      },
    ],
  },
  {
    call: true,
    title: 'Buitenlandse akten inleveren (brondocumenten)',
  },
]

export const MakeAppointmentScreen = () => {
  return (
    <Screen>
      <Box>
        <Column gutter="sm">
          <Column gutter="md">
            <SingleSelectable>
              <Title text="Afspraak maken" />
              <Title level="h4" text="op Stadsloket in Amsterdam" />
            </SingleSelectable>
            <Paragraph>
              Bekijk voor welke onderwerpen u een afspraak kunt maken en wat u
              moet meenemen.
            </Paragraph>
          </Column>
          <>
            {sections.map(({call, externalLinks, text, title}) => (
              <Accordion key={title} title={title}>
                <Column gutter="md">
                  {!!text && <Paragraph>{text}</Paragraph>}
                  {!!call && (
                    <Column gutter="sm">
                      <Paragraph>
                        Afspraak maken kan alleen telefonisch
                      </Paragraph>
                      <Row>
                        <Button
                          accessibilityLabel="Bel veertien nul twintig"
                          icon={Phone}
                          label="Bel 14 020"
                          onPress={() => {
                            openPhoneUrl('14020')
                          }}
                        />
                      </Row>
                    </Column>
                  )}
                  {!!externalLinks?.length && (
                    <Column gutter="md">
                      {externalLinks.map(({label, url}) => (
                        <Link
                          key={label}
                          label={label}
                          onPress={() => openWebUrl(url)}
                          variant="external"
                        />
                      ))}
                    </Column>
                  )}
                </Column>
              </Accordion>
            ))}
          </>
        </Column>
      </Box>
    </Screen>
  )
}
