import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {Button} from '../../../../components/ui'
import {Gutter, Row} from '../../../../components/ui/layout'
import {color} from '../../../../tokens'
import {selectAddress} from '../../../address/addressSlice'
import {AddressRouteName, AddressStackParams} from '../../../address/routes'

export const ProvideAddressButton = () => {
  const {primary: address} = useSelector(selectAddress)
  // TODO Check
  const navigation = useNavigation<StackNavigationProp<AddressStackParams>>()

  if (address) {
    return null
  }

  return (
    <>
      <Gutter height="md" />
      <Row align="start">
        <Button
          onPress={() => navigation.navigate(AddressRouteName.addressForm)}
          icon={<Location fill={color.font.inverse} />}
          text="Vul uw adres in"
        />
      </Row>
    </>
  )
}
