import React, {useContext} from 'react'
import {Button} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Column, Row, Screen} from '@/components/ui/layout'
import {List, Paragraph, Title} from '@/components/ui/text'
import {DeviceContext} from '@/providers'
import {accessibleText, openMailUrl} from '@/utils'

const appEmail = 'app@amsterdam.nl'

export const AccessibilityStatementScreen = () => {
  const {isPortrait, isTablet} = useContext(DeviceContext)
  return (
    <Screen>
      <Box>
        <Column gutter="lg">
          <Column gutter="md">
            <Title
              accessibilityLabel="Toegankelijkheidsverklaring"
              text={`Toegankelijkheids${
                isPortrait && !isTablet ? '-\n' : ''
              }verklaring`}
            />
            <Paragraph variant="intro">
              De gemeente Amsterdam wil dat iedereen de Amsterdam app kan
              gebruiken.
            </Paragraph>
          </Column>
          <Column gutter="md">
            <Title level="h2" text="Genomen maatregelen" />
            <Paragraph>
              Iedereen moet apps van de overheid kunnen gebruiken. Dit doen wij
              om de Amsterdam app toegankelijk te maken en te houden voor
              iedereen:
            </Paragraph>
            <List
              items={[
                'Wij ontwikkelen de Amsterdam app volgens toegankelijkheidseisen die zijn vastgelegd in de WCAG 2.1, niveau AA.',
                'ons eigen beleid: het stedelijk kader verwerken persoonsgegevens.',
                'Wij ontwikkelen de Amsterdam app samen met u, de Amsterdammer.',
                'We doen regelmatig gebruikersonderzoek.',
                'Onafhankelijke deskundigen toetsen regelmatig (onderdelen van) onze app op toegankelijkheid.',
                'Onze redactie toetst vóór publicatie alle content op toegankelijkheid.',
                'We lossen knelpunten op.',
                'Onze medewerkers houden hun kennis over toegankelijkheid op peil.',
              ]}
            />
          </Column>
          <Column gutter="md">
            <Title
              level="h2"
              text="Onderdelen die nog niet toegankelijk zijn"
            />
            <List
              items={[
                'Met VoiceOver op iOS wordt de focus niet altijd op het eerste interactieve element gezet.',
                'Formulieren zijn niet uitsluitend met toetsenbord in te vullen.',
                'Donkere modus wordt nog niet ondersteund.',
                "In de Amsterdam app worden webpagina's getoond binnen een 'webview'. De webpagina's binnen de webview zijn niet volledig toegankelijk.",
              ]}
            />
          </Column>
          <Column gutter="md">
            <Title level="h2" text="Werkt iets niet?" />
            <Paragraph>
              Komt u nog een scherm tegen die u niet kunt lezen of gebruiken?
              Meld het ons via een e-mail naar {appEmail}.
            </Paragraph>
            <Row>
              <Button
                accessibilityLabel={accessibleText(
                  'Stuur een e-mail naar',
                  'app@amsterdam.nl',
                )}
                ellipsizeMode="tail"
                iconName="email"
                label={appEmail}
                numberOfLines={1}
                onPress={() => {
                  openMailUrl(appEmail, 'Iets werkt niet in de Amsterdam app')
                }}
              />
            </Row>
          </Column>
          <Column gutter="md">
            <Title level="h2" text="Wat kunt u van ons verwachten?" />
            <Paragraph>
              Binnen 5 werkdagen krijgt u een ontvangstbevestiging.
            </Paragraph>
            <Paragraph>
              We informeren u over de voortgang en de uitkomst.
            </Paragraph>
            <Paragraph>Binnen 2 weken is uw verzoek afgehandeld.</Paragraph>
          </Column>
        </Column>
      </Box>
    </Screen>
  )
}