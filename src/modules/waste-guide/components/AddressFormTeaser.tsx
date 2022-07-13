import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Card, CardBody, Text, Title} from '@/components/ui'
import {TextInput} from '@/components/ui/forms'
import {module as addressModule} from '@/modules/address'
import {AddressRouteName} from '@/modules/address/routes'
import {module as wasteGuideModule} from '@/modules/waste-guide'

type Props = {
  text: string
  title: string
}

export const AddressFormTeaser = ({text, title}: Props) => {
  const inputLabel = 'Vul uw postcode of straatnaam in'
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof wasteGuideModule.slug>
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
            navigation.navigate(addressModule.slug, {
              screen: AddressRouteName.addressForm,
            })
          }
        />
      </CardBody>
    </Card>
  )
}
