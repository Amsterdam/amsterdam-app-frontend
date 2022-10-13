import React, {useContext} from 'react'
import {Box} from '@/components/ui/containers'
import {Column, Screen} from '@/components/ui/layout'
import {List, Paragraph, Title} from '@/components/ui/text'
import {DeviceContext} from '@/providers'

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
                {
                  text: 'Deze opsomming bijwerken en aanvullen voordat we de eerste release uitbrengen.',
                  color: 'red',
                },
                'Met Voice over op iOS wordt de focus niet altijd op het eerste interactieve element gezet.',
                'Formulieren zijn niet uitsluitend met toetsenbord in te vullen.',
                'Donkere modus wordt nog niet ondersteund.',
                "In de Amsterdam app worden webpagina's getoond binnen een 'webview'. De webpagina's binnen de webview zijn niet volledig toegankelijk.",
              ]}
            />
          </Column>
        </Column>
      </Box>
    </Screen>
  )
}
