import React from 'react'
import {Box} from '@/components/ui/containers'
import {Column, Screen} from '@/components/ui/layout'
import {List, Paragraph, Title} from '@/components/ui/text'

export const AccessibilityStatementScreen = () => (
  <Screen>
    <Box>
      <Column gutter="lg">
        <Column gutter="md">
          <Title text="Toegankelijkheidsverklaring" />
          <Paragraph variant="intro">
            De gemeente Amsterdam wil dat iedereen de Amsterdam app kan
            gebruiken.
          </Paragraph>
        </Column>
        <Column gutter="md">
          <Title level="h2" text="Genomen maatregelen" />
          <Paragraph>
            Iedereen moet apps van de overheid kunnen gebruiken. Dit doen wij om
            de Amsterdam app toegankelijk te maken en te houden voor iedereen:
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
          <Paragraph>
            Als u iets wilt regelen of aanvragen via Amsterdam.nl, dan heeft de
            gemeente vaak contactgegevens, zoals uw telefoonnummer en
            e-mailadres, van u nodig om u goed te kunnen helpen.
          </Paragraph>
          <Paragraph>
            Voor aanvragen en hulp op het gebied van werk, inkomen, jeugdhulp of
            zorg kan de gemeente gevoelige persoonsgegevens van u nodig hebben,
            zoals financiële en medische gegevens. Ook verwerkt de gemeente
            persoonsgegevens om bijvoorbeeld belasting te heffen, fraude te
            bestrijden, handhavingstaken uit te voeren en om uitvoering te geven
            aan het openbare orde- en veiligheidsbeleid.
          </Paragraph>
        </Column>
        <Column gutter="md">
          <Title
            level="h2"
            text="Algemene versus specifieke privacyverklaring"
          />
          <Paragraph>
            In de algemene privacyverklaring staat meer informatie over de
            uitgangspunten waar de gemeente Amsterdam zich aan houdt. In de
            specifieke privacyverklaring staat per thema meer informatie over de
            manier waarop we uw persoonsgegevens gebruiken. Daar vindt u
            bijvoorbeeld welke gegevens we gebruiken voor welk doel, en ook of
            en met wie we die gegevens delen.
          </Paragraph>
        </Column>
      </Column>
    </Box>
  </Screen>
)
