import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {View} from 'react-native'
import {Box} from '@/components/ui'
import {Button, IconButton} from '@/components/ui/buttons'
import {Column, Gutter, Row, Screen, ScrollView} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {AddressRouteName, AddressStackParams} from '@/modules/address/routes'
import {useTheme} from '@/themes'

export const AddressPrivacyInfoScreen = ({
  navigation,
}: {
  navigation: StackNavigationProp<
    AddressStackParams,
    AddressRouteName.addressInfo
  >
}) => {
  const {color, size} = useTheme()

  return (
    <Screen>
      <ScrollView grow>
        <Box grow>
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
          <Column align="between" gutter="xl">
            <View>
              <Title margin text="Veilig omgaan met uw adres" />
              <Text margin intro>
                Wij slaan uw adres niet op. Het staat alleen in de app op uw
                telefoon. We kunnen uw adres dus aan niemand geven.
              </Text>
              <Text margin>
                Wij gebruiken uw adres alleen om u informatie uit uw buurt te
                laten zien. De informatie gaat over wegwerkzaamheden,
                bouwprojecten, het dichtstbijzijnde Stadsloket en informatie
                over afval.
              </Text>
              <Text margin>
                U kunt uw adres wijzigen of verwijderen. Ga dan naar uw
                instellingen.
              </Text>
            </View>
            <Button label="Ik begrijp het" onPress={navigation.goBack} />
          </Column>
        </Box>
        <Gutter height="md" />
      </ScrollView>
    </Screen>
  )
}
