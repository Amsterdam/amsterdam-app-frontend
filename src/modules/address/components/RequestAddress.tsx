import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {AddButton} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {AddressModalName} from '@/modules/address/routes'
import {module as userModule} from '@/modules/user'

export const RequestAddress = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()

  return (
    <Column gutter="md">
      <Paragraph>
        Vul een straatnaam en huisnummer in zodat u informatie krijgt uit die
        buurt.
      </Paragraph>
      <AddButton
        accessibilityLabel="Voeg adres toe"
        onPress={() => navigation.navigate(AddressModalName.addressForm)}
      />
    </Column>
  )
}
