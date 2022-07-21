import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {AddressForm} from '../components'
import {AddressRouteName, AddressStackParams} from '../routes'
import {Screen} from '@/components/ui/layout'

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
