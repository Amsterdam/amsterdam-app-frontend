import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {View} from 'react-native'
import {useSelector} from 'react-redux'
import {Box, Button, IconButton, Text, Title} from '@/components/ui'
import {Column, Gutter, Row, ScrollView} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {AddressRouteName, AddressStackParams} from '@/modules/address/routes'
import {selectTheme} from '@/themes'

export const AddressPrivacyInfoScreen = ({
  navigation,
}: {
  navigation: StackNavigationProp<
    AddressStackParams,
    AddressRouteName.addressInfo
  >
}) => {
  const {
    theme: {color},
  } = useSelector(selectTheme)

  return (
    <ScrollView grow>
      <Box grow>
        <Row align="end">
          <IconButton
            accessibilityLabel="Sluiten"
            accessibilityRole="button"
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
              bouwprojecten, het dichtstbijzijnde Stadsloket en informatie over
              afval.
            </Text>
            <Text margin>
              U kunt uw adres wijzigen of verwijderen. Ga dan naar uw
              instellingen.
            </Text>
          </View>
          <Button onPress={navigation.goBack} text="Ik begrijp het" />
        </Column>
      </Box>
      <Gutter height="md" />
    </ScrollView>
  )
}
