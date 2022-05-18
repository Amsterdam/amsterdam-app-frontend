import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {StackParams} from '../../../app/navigation'
import {AddressForm} from '../components'

type AddressFormScreenRouteProp = RouteProp<StackParams, 'AddressForm'>

type Props = {
  route: AddressFormScreenRouteProp
}

export const AddressFormScreen = ({route}: Props) => (
  <AddressForm temp={route?.params?.temp} />
)
