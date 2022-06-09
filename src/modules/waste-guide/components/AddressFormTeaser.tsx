import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {module as wasteGuideModule} from '../'
import {RootStackParamList} from '../../../app/navigation'
import {Card, CardBody, Text, Title} from '../../../components/ui'
import {TextInput} from '../../../components/ui/forms'
import {module as addressModule} from '../../address'
import {AddressRouteName} from '../../address/routes'

type Props = {
  text: string
  title: string
}

export const AddressFormTeaser = ({text, title}: Props) => {
  const inputLabel = 'Vul uw postcode of straatnaam in'
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, typeof wasteGuideModule.name>
    >()

  return (
    <Card>
      <CardBody>
        <Title margin text={title} />
        <Text margin>{text}</Text>
        <TextInput
          accessibilityLabel={inputLabel}
          label={inputLabel}
          onFocus={() =>
            navigation.navigate(addressModule.name, {
              screen: AddressRouteName.addressForm,
            })
          }
        />
      </CardBody>
    </Card>
  )
}
