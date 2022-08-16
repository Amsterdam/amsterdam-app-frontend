import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Screen} from '@/components/ui/layout'
import {ModalHeader} from '@/components/ui/modals'
import {AddressForm} from '@/modules/address/components'
import {AddressModalName} from '@/modules/address/routes'

type AddressFormScreenRouteProp = RouteProp<
  RootStackParams,
  AddressModalName.addressForm
>

type Props = {
  route: AddressFormScreenRouteProp
}

export const AddressFormScreen = ({route}: Props) => (
  <Screen keyboardAware scroll stickyHeader={<ModalHeader title="Adres" />}>
    <AddressForm temp={route?.params?.addressIsTemporary} />
  </Screen>
)
