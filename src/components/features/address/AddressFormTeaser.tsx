import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {homeScreenOptions, HomeStackParamList} from '../../../App/navigation'
import {Card, CardBody, Text, Title} from '../../ui'
import {TextInput} from '../../ui/forms'

type Props = {
  text: string
  title: string
}

export const AddressFormTeaser = ({text, title}: Props) => {
  const inputLabel = 'Vul uw postcode of straatnaam in'
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParamList, 'Home'>>()

  return (
    <Card>
      <CardBody>
        <Title margin text={title} />
        <Text margin>{text}</Text>
        <TextInput
          label={inputLabel}
          onFocus={() =>
            navigation.navigate(homeScreenOptions.addressForm.name)
          }
          accessibilityLabel={inputLabel}
        />
      </CardBody>
    </Card>
  )
}
