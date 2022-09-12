import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {SVGProps} from 'react'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {Gutter, Row} from '@/components/ui/layout'
import {AddressModalName} from '@/modules/address/routes'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {Theme, useThemable} from '@/themes'

export const ProvideAddressButton = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, ConstructionWorkRouteName.projects>
    >()

  const iconProps = useThemable(createIconProps)

  return (
    <>
      <Gutter height="lg" />
      <Row align="start">
        <Button
          icon={<Location {...iconProps} />}
          label="Vul uw adres in"
          onPress={() => navigation.navigate(AddressModalName.addressForm)}
        />
      </Row>
      <Gutter height="md" />
    </>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.inverse,
})
