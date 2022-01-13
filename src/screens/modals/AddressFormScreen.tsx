import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {StackParams} from '../../app/navigation'
import {AddressForm} from '../../components/features/address'

type AddressFormScreenRouteProp = RouteProp<StackParams, 'AddressForm'>

type Props = {
  route: AddressFormScreenRouteProp
}

export const AddressFormScreen = ({route}: Props) => {
  return <AddressForm saveInAsyncStorage={route?.params?.saveInAsyncStorage} />
}
