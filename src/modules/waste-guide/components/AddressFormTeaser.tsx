import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../../app/navigation'
import {Card, CardBody, Text, Title} from '../../../components/ui'
import {TextInput} from '../../../components/ui/forms'
import {AddressRouteName} from '../../address/routes'

type Props = {
  text: string
  title: string
}

export const AddressFormTeaser = ({text, title}: Props) => {
  const inputLabel = 'Vul uw postcode of straatnaam in'
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'WasteGuideModule'>>()

  return (
    <Card>
      <CardBody>
        <Title margin text={title} />
        <Text margin>{text}</Text>
        <TextInput
          accessibilityLabel={inputLabel}
          label={inputLabel}
          onFocus={() => navigation.navigate(AddressRouteName.addressForm)}
        />
      </CardBody>
    </Card>
  )
}
