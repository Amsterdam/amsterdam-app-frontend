import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {SVGProps} from 'react'
import {AccessibilityProps} from 'react-native'
import {RootStackParams} from '@/app/navigation'
import {Edit} from '@/assets/icons'
import {IconButton} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text'
import {AddressModalName} from '@/modules/address/routes'
import {module as wasteGuideModule} from '@/modules/waste-guide'
import {Theme, useThemable} from '@/themes'

type Props = {
  address: string
  isTemporary?: boolean
} & Pick<AccessibilityProps, 'accessibilityLabel'>

export const StreetAddressWithEditButton = ({
  accessibilityLabel,
  address,
  isTemporary = false,
}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof wasteGuideModule.slug>
    >()
  const iconProps = useThemable(createIconProps)

  return (
    <Row gutter="sm" valign="center">
      <Phrase accessibilityLabel={accessibilityLabel}>{address}</Phrase>
      <IconButton
        accessibilityLabel="Wijzig het adres"
        icon={
          <Icon>
            <Edit {...iconProps} />
          </Icon>
        }
        onPress={() =>
          navigation.navigate(AddressModalName.addressForm, {
            addressIsTemporary: isTemporary,
          })
        }
      />
    </Row>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
