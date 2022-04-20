import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {color} from '../../../tokens'
import {Button} from '../../ui'
import {Row} from '../../ui/layout'
import {selectAddress} from '../address/addressSlice'

export const ProvideAddressButton = () => {
  const {primary: address} = useSelector(selectAddress)
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Projects'>>()

  if (address) {
    return null
  }

  return (
    <Row align="start">
      <Button
        onPress={() => navigation.navigate(routes.addressForm.name)}
        icon={<Location fill={color.font.inverse} />}
        text="Vul uw adres in"
      />
    </Row>
  )
}
