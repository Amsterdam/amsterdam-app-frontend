import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../../../App'
import {menuScreenOptions} from '../../../App/navigation/screenOptions'
import {Card, CardBody, Text, Title} from '../../ui'
import {TextInput} from '../../ui/forms'

type Props = {
  text: string
  title: string
}

export const AddressFormTeaser = ({text, title}: Props) => {
  const inputLabel = 'Vul uw postcode of straatnaam in'
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>()

  return (
    <Card>
      <CardBody>
        <Title margin text={title} />
        <Text margin>{text}</Text>
        <TextInput
          label={inputLabel}
          onFocus={() =>
            navigation.navigate(menuScreenOptions.addressForm.name)
          }
          accessibilityLabel={inputLabel}
        />
      </CardBody>
    </Card>
  )
}
