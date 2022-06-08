import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {RootStackParamList} from '../../../../app/navigation'
import {Button} from '../../../../components/ui'
import {Gutter, Row} from '../../../../components/ui/layout'
import {color} from '../../../../tokens'
import {module as addressModule} from '../../../address'
import {selectAddress} from '../../../address/addressSlice'
import {AddressRouteName} from '../../../address/routes'
import {ProjectsRouteName} from '../../routes'

export const ProvideAddressButton = () => {
  const {primary: address} = useSelector(selectAddress)
  // TODO Check
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, ProjectsRouteName.projects>
    >()

  if (address) {
    return null
  }

  return (
    <>
      <Gutter height="md" />
      <Row align="start">
        <Button
          onPress={() =>
            navigation.navigate(
              addressModule.name,
              AddressRouteName.addressForm,
            )
          }
          icon={<Location fill={color.font.inverse} />}
          text="Vul uw adres in"
        />
      </Row>
    </>
  )
}
