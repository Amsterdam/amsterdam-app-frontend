import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Location} from '@/assets/icons'
import {Button} from '@/components/ui/buttons'
import {Gutter, Row} from '@/components/ui/layout'
import {AddressModalName} from '@/modules/address/routes'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

export const ProvideAddressButton = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, ConstructionWorkRouteName.projects>
    >()

  return (
    <>
      <Gutter height="lg" />
      <Row align="start">
        <Button
          icon={Location}
          label="Vul uw adres in"
          onPress={() => navigation.navigate(AddressModalName.addressForm)}
        />
      </Row>
      <Gutter height="md" />
    </>
  )
}
