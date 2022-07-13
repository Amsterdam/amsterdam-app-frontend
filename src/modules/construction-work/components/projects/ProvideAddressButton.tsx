import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {Gutter, Row} from '@/components/ui/layout'
import {module as addressModule} from '@/modules/address'
import {AddressRouteName} from '@/modules/address/routes'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {useTheme} from '@/themes'

export const ProvideAddressButton = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, ConstructionWorkRouteName.projects>
    >()

  const {color} = useTheme()

  return (
    <>
      <Gutter height="lg" />
      <Row align="start">
        <Button
          icon={<Location fill={color.text.inverse} />}
          label="Vul uw adres in"
          onPress={() =>
            navigation.navigate(addressModule.slug, {
              screen: AddressRouteName.addressForm,
            })
          }
        />
      </Row>
      <Gutter height="md" />
    </>
  )
}
