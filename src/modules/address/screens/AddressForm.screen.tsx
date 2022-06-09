import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {AddressForm} from '../components'
import {AddressRouteName, AddressStackParams} from '../routes'

type AddressFormScreenRouteProp = RouteProp<
  AddressStackParams,
  AddressRouteName.addressForm
>

type Props = {
  route: AddressFormScreenRouteProp
}

export const AddressFormScreen = ({route}: Props) => (
  <AddressForm temp={route?.params?.temp} />
)
