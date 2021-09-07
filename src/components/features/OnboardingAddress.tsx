import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../../App'
import {Box, Card, CardBody, Text, TextInput, Title} from '../ui'

export const OnboardingAddress = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'AddressForm'>>()

  return (
    <Box>
      <Card>
        <CardBody>
          <Title margin text="Uw buurt" />
          <Text margin>
            Vul uw adres en huisnummer in zodat we informatie uit uw buurt
            kunnen tonen.
          </Text>
          <TextInput
            label="Vul uw postcode of straatnaam in"
            onFocus={() => navigation.navigate('AddressForm')}
            placeholder="1234AB of voorbeeldstraat"
          />
        </CardBody>
      </Card>
    </Box>
  )
}
