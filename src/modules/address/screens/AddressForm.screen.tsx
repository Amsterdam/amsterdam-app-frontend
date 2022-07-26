import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {Screen} from '@/components/ui/layout'
import {AddressForm} from '@/modules/address/components'
import {AddressRouteName, AddressStackParams} from '@/modules/address/routes'

type AddressFormScreenRouteProp = RouteProp<
  AddressStackParams,
  AddressRouteName.addressForm
>

type Props = {
  route: AddressFormScreenRouteProp
}

export const AddressFormScreen = ({route}: Props) => (
  <Screen scroll={false}>
    <AddressForm temp={route?.params?.addressIsTemporary} />
  </Screen>
)
