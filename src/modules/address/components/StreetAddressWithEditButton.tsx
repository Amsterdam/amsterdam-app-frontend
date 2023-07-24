import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {AccessibilityProps, ViewProps} from 'react-native'
import {RootStackParams} from '@/app/navigation/types'
import {IconButton} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text'
import {AddressModalName} from '@/modules/address/routes'
import {wasteGuideModule} from '@/modules/waste-guide'

type Props = {
  address: string
  testIDButton?: ViewProps['testID']
  testIDLabel?: ViewProps['testID']
} & Pick<AccessibilityProps, 'accessibilityLabel'>

export const StreetAddressWithEditButton = ({
  accessibilityLabel,
  address,
  testIDButton,
  testIDLabel,
}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof wasteGuideModule.slug>
    >()

  return (
    <Row
      gutter="sm"
      valign="center">
      <Phrase
        accessibilityLabel={accessibilityLabel}
        testID={testIDLabel}>
        {address}
      </Phrase>
      <IconButton
        accessibilityLabel="Wijzig het adres"
        icon={
          <Icon
            color="link"
            name="edit"
          />
        }
        onPress={() => navigation.navigate(AddressModalName.addressForm)}
        testID={testIDButton}
      />
    </Row>
  )
}
