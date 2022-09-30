import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {SVGProps} from 'react'
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
  adres: string
}

export const AddressTitle = ({adres}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof wasteGuideModule.slug>
    >()
  const iconProps = useThemable(createIconProps)

  return (
    <Row gutter="sm" valign="center">
      <Phrase>{adres}</Phrase>
      <IconButton
        accessibilityLabel="Wijzig adres"
        icon={
          <Icon>
            <Edit {...iconProps} />
          </Icon>
        }
        onPress={() =>
          navigation.navigate(AddressModalName.addressForm, {
            addressIsTemporary: true,
          })
        }
      />
    </Row>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
