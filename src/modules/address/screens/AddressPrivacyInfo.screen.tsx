import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui'
import {Button, IconButton} from '@/components/ui/buttons'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {AddressModalName} from '@/modules/address/routes'
import {useTheme} from '@/themes'

export const AddressPrivacyInfoScreen = ({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParams, AddressModalName.addressInfo>
}) => {
  const {color} = useTheme()

  return (
    <Screen
      stickyHeader={
        <Box>
          <Row align="end">
            <IconButton
              accessibilityLabel="Sluiten"
              icon={
                <Icon size={20}>
                  <Close fill={color.text.default} />
                </Icon>
              }
              onPress={navigation.goBack}
            />
          </Row>
        </Box>
      }
      stickyFooter={
        <Box>
          <Button label="Ik begrijp het" onPress={navigation.goBack} />
        </Box>
      }>
      <Box>
        <Title text="Veilig omgaan met uw adres" />
        <Box insetVertical="md">
          <Column gutter="md">
            <Paragraph variant="intro">
              Wij slaan uw adres niet op. Het staat alleen in de app op uw
              telefoon. We kunnen uw adres dus aan niemand geven.
            </Paragraph>
            <Paragraph>
              Wij gebruiken uw adres alleen om u informatie uit uw buurt te
              laten zien. De informatie gaat over wegwerkzaamheden,
              bouwprojecten, het dichtstbijzijnde Stadsloket en informatie over
              afval.
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
}
