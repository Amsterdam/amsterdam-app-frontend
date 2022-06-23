import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {RootStackParamList} from '@/app/navigation'
import {Button} from '@/components/ui'
import {Gutter, Row} from '@/components/ui/layout'
import {module as addressModule} from '@/modules/address'
import {selectAddress} from '@/modules/address/addressSlice'
import {AddressRouteName} from '@/modules/address/routes'
import {ProjectsRouteName} from '@/modules/construction-work/routes'
import {useTheme} from '@/themes'

export const ProvideAddressButton = () => {
  const {primary: address} = useSelector(selectAddress)
  // TODO Check
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, ProjectsRouteName.projects>
    >()

  const {color} = useTheme()

  if (address) {
    return null
  }

  return (
    <>
      <Gutter height="md" />
      <Row align="start">
        <Button
          onPress={() =>
            navigation.navigate(addressModule.name, {
              screen: AddressRouteName.addressForm,
            })
          }
          icon={<Location fill={color.text.inverse} />}
          text="Vul uw adres in"
        />
      </Row>
    </>
  )
}
