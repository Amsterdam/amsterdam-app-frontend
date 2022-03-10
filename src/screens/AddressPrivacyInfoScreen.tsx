import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {StackParams} from '../app/navigation'
import {Box, Button, Text, Title} from '../components/ui'
import {Column, Gutter, Row, ScrollView} from '../components/ui/layout'
import {color} from '../tokens'

export const AddressPrivacyInfoScreen = ({
  navigation,
}: {
  navigation: StackNavigationProp<StackParams, 'Home'>
}) => {
  return (
    <ScrollView grow>
      <Box grow>
        <Row align="end">
          <TouchableOpacity
            accessibilityLabel="Sluiten"
            accessibilityRole="button"
            onPress={navigation.goBack}>
            <Close fill={color.font.regular} height={20} width={20} />
          </TouchableOpacity>
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
