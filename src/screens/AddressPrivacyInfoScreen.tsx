import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {TouchableOpacity} from 'react-native'
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
    <ScrollView fullScreen>
      <Row align="end">
        <Box inset="sm">
          <TouchableOpacity onPress={navigation.goBack}>
            <Close fill={color.font.regular} height={28} width={28} />
          </TouchableOpacity>
        </Box>
      </Row>
      <Column align="between">
        <Box insetHorizontal="md">
          <Column gutter="md">
            <Title text="Veilig omgaan met uw adres" />
            <Text intro>
              Wij slaan uw adres niet op. Het staat alleen in de app op uw
              telefoon. We kunnen uw adres dus aan niemand geven.
            </Text>
            <Text>
              Wij gebruiken uw adres alleen om u informatie uit uw buurt te
              laten zien. De informatie gaat over wegwerkzaamheden,
              bouwprojecten, het dichtstbijzijnde Stadsloket en informatie over
              afval.
            </Text>
            <Text>
              U kunt uw adres wijzigen of verwijderen. Ga dan naar uw
              instellingen.
            </Text>
          </Column>
        </Box>
        <Box>
          <Button onPress={navigation.goBack} text="Ik begrijp het" />
        </Box>
      </Column>
      <Gutter height="md" />
    </ScrollView>
  )
}
