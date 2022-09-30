import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {ModalHeader} from '@/components/ui/containers'
import {Screen} from '@/components/ui/layout'
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
  <Screen scroll={false} stickyHeader={<ModalHeader title="Adres" />}>
    <AddressForm temp={route?.params?.addressIsTemporary} />
  </Screen>
)
