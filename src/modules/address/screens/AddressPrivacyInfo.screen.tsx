import React from 'react'
import {Box} from '@/components/ui'
import {Column, Screen} from '@/components/ui/layout'
import {CloseModalButton, ModalHeader} from '@/components/ui/modals'
import {Paragraph, Title} from '@/components/ui/text'

export const AddressPrivacyInfoScreen = () => (
  <Screen
    stickyHeader={<ModalHeader title="Adres" />}
    stickyFooter={<CloseModalButton label="Ik begrijp het" />}>
    <Box>
      <Title text="Veilig omgaan met uw adres" />
      <Box insetVertical="md">
        <Column gutter="md">
          <Paragraph variant="intro">
            Wij slaan uw adres niet op. Het staat alleen in de app op uw
            telefoon. We kunnen uw adres dus aan niemand geven.
          </Paragraph>
          <Paragraph>
            Wij gebruiken uw adres alleen om u informatie uit uw buurt te laten
            zien. De informatie gaat over wegwerkzaamheden, bouwprojecten, het
            dichtstbijzijnde Stadsloket en informatie over afval.
          </Paragraph>
          <Paragraph>
            U kunt uw adres wijzigen of verwijderen. Ga dan naar uw
            instellingen.
          </Paragraph>
        </Column>
      </Box>
    </Box>
  </Screen>
)
