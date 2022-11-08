import React from 'react'
import {Box} from '@/components/ui/containers'
import {Column, Screen} from '@/components/ui/layout'
import {Link, List, Paragraph, Title} from '@/components/ui/text'
import {openWebUrl} from '@/utils'

export const PrivacyStatementScreen = () => (
  <Screen>
    <Box>
      <Column gutter="lg">
        <Column gutter="md">
          <Title text="Samenvatting privacyverklaring gemeente Amsterdam" />
          <Paragraph variant="intro">
            De gemeente voert alleen taken uit die belangrijk zijn voor haar
            inwoners en bezoekers. De gemeente gebruikt hiervoor soms
            persoonsgegevens. Als u in Amsterdam woont, houdt de gemeente
            bijvoorbeeld uw naam, geboortedatum, woonadres en
            Burgerservicenummer (BSN) bij in de Basisregistratie personen (BRP).
          </Paragraph>
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
          <Title level="h2" text="Het verwerken van persoonsgegevens" />
          <Paragraph>
            Het gebruiken van persoonsgegevens noemen we ook wel ‘verwerken’ van
            persoonsgegevens. Het hangt van het doel en de taak van de gemeente
            af welke persoonsgegevens de gemeente precies verwerkt. De
            specifieke privacyverklaringen geven daar meer informatie over. De
            gemeente Amsterdam vindt uw privacy belangrijk. Wij beschermen uw
            persoonsgegevens daarom goed. Dit doen wij op basis van:
          </Paragraph>
          <List
            items={[
              'de privacywetten;',
              'ons eigen beleid: het stedelijk kader verwerken persoonsgegevens.',
            ]}
          />
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
          <Link
            label="Algemene privacyverklaring"
            onPress={() =>
              openWebUrl('https://www.amsterdam.nl/privacy/privacyverklaring/')
            }
          />
          <Link
            label="Specifieke privacyverklaring"
            onPress={() =>
              openWebUrl('https://www.amsterdam.nl/privacy/specifieke/')
            }
          />
        </Column>
      </Column>
    </Box>
  </Screen>
)
