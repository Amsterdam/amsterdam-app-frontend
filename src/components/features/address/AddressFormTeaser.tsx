import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {Card, CardBody, Text, Title} from '../../ui'
import {TextInput} from '../../ui/forms'

type Props = {
  text: string
  saveInAsyncStorage?: boolean
  title: string
}

export const AddressFormTeaser = ({
  saveInAsyncStorage = true,
  text,
  title,
}: Props) => {
  const inputLabel = 'Vul uw postcode of straatnaam in'
  const navigation = useNavigation<StackNavigationProp<StackParams, 'Home'>>()

  return (
    <Card>
      <CardBody>
        <Title margin text={title} />
        <Text margin>{text}</Text>
        <TextInput
          label={inputLabel}
          onFocus={() =>
            navigation.navigate(routes.addressForm.name, {
              saveInAsyncStorage,
            })
          }
          accessibilityLabel={inputLabel}
        />
      </CardBody>
    </Card>
  )
}
