import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../../App'
import {Card, CardBody, Text, TextInput, Title} from '../ui'

type Props = {
  text: string
  title: string
}

export const OnboardingAddress = ({text, title}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>()

  return (
    <Card>
      <CardBody>
        <Title margin text={title} />
        <Text margin>{text}</Text>
        <TextInput
          label="Vul uw postcode of straatnaam in"
          onFocus={() => navigation.navigate('AddressForm')}
          placeholder="1234AB of voorbeeldstraat"
        />
      </CardBody>
    </Card>
  )
}
